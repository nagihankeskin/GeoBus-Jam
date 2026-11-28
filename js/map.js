/* =====================================================
   GEOBUS JAM - BEYTEPE ROAD GRAPH & MAP CAMERA
===================================================== */

// Beytepe oyun alanının merkez koordinatı
const PARKING_CENTER = [39.87313098775291, 32.732391598410146];

const PARKING_ZOOM = 19;
const BEYTEPE_OVERVIEW_DELAY = 2200;

const map = L.map("map", {
    zoomControl: true,
    preferCanvas: true
}).setView([39.875, 32.735], 14);

// OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const gameStatus = document.getElementById("game-status");

function updateGameStatus(message) {
    if (gameStatus) {
        gameStatus.textContent = message;
    }
}

// Haritayı oyun motoruna aç
window.gameMap = map;
window.beytepeParkingCenter = PARKING_CENTER;

// Oyun alanına yakınlaş
function zoomToParkingLot() {
    map.flyTo(PARKING_CENTER, PARKING_ZOOM, {
        animate: true,
        duration: 2
    });
}

window.zoomToParkingLot = zoomToParkingLot;

// Önce Beytepe genel görünümü, ardından oyun alanı
function showBeytepeOverviewThenParking(bounds) {
    if (bounds && bounds.isValid()) {
        map.fitBounds(bounds, {
            padding: [25, 25],
            animate: false
        });
    }

    window.setTimeout(() => {
        zoomToParkingLot();
    }, BEYTEPE_OVERVIEW_DELAY);
}

// GeoJSON özelliklerini oku
function getRoadProperty(feature, name) {
    const properties = feature.properties || {};

    return properties[name] ??
        properties.tags?.[name] ??
        null;
}

// Yol stilleri
function roadStyle(feature) {
    const type = getRoadProperty(feature, "highway");

    const styles = {
        motorway: {
            color: "#d58b76",
            weight: 4
        },
        trunk: {
            color: "#d58b76",
            weight: 4
        },
        primary: {
            color: "#e39b42",
            weight: 4
        },
        secondary: {
            color: "#d8a96c",
            weight: 3
        },
        tertiary: {
            color: "#9b87cc",
            weight: 2.5
        },
        unclassified: {
            color: "#9b87cc",
            weight: 2
        },
        residential: {
            color: "#8b78c8",
            weight: 1.8
        },
        living_street: {
            color: "#8b78c8",
            weight: 1.8
        },
        service: {
            color: "#a99acb",
            weight: 1.5
        }
    };

    const style = styles[type] || {
        color: "#8b78c8",
        weight: 2
    };

    return {
        color: style.color,
        weight: style.weight,
        opacity: 0.85,
        lineCap: "round",
        lineJoin: "round"
    };
}

// GeoJSON koordinatlarını yol çizgilerine dönüştür
function extractRoadLines(geojson) {
    const lines = [];

    geojson.features.forEach(feature => {
        const geometry = feature.geometry;

        if (!geometry) return;

        if (geometry.type === "LineString") {
            lines.push({
                coordinates: geometry.coordinates,
                properties: feature.properties || {}
            });
        }

        if (geometry.type === "MultiLineString") {
            geometry.coordinates.forEach(coordinates => {
                lines.push({
                    coordinates,
                    properties: feature.properties || {}
                });
            });
        }
    });

    return lines;
}

// Koordinat anahtarı
function coordinateKey(coordinate) {
    return (
        coordinate[0].toFixed(7) +
        "," +
        coordinate[1].toFixed(7)
    );
}

// İki koordinat arasındaki mesafe
function distanceBetween(a, b) {
    const lat1 = a[1];
    const lon1 = a[0];

    const lat2 = b[1];
    const lon2 = b[0];

    const R = 6371000;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const x =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.atan2(
        Math.sqrt(x),
        Math.sqrt(1 - x)
    );
}

// Yol grafiğini oluştur
function buildRoadGraph(roadLines) {
    const nodes = new Map();
    const edges = [];
    let edgeId = 0;

    roadLines.forEach(line => {
        const coordinates = line.coordinates;

        for (let i = 0; i < coordinates.length - 1; i++) {
            const a = coordinates[i];
            const b = coordinates[i + 1];

            const keyA = coordinateKey(a);
            const keyB = coordinateKey(b);

            if (!nodes.has(keyA)) {
                nodes.set(keyA, {
                    id: keyA,
                    coordinate: a,
                    edges: []
                });
            }

            if (!nodes.has(keyB)) {
                nodes.set(keyB, {
                    id: keyB,
                    coordinate: b,
                    edges: []
                });
            }

            const distance = distanceBetween(a, b);

            const edge = {
                id: edgeId++,
                from: keyA,
                to: keyB,
                distance,
                properties: line.properties
            };

            edges.push(edge);

            nodes.get(keyA).edges.push(edge);
            nodes.get(keyB).edges.push(edge);
        }
    });

    const intersections = [];

    nodes.forEach(node => {
        if (node.edges.length > 2) {
            intersections.push(node);
        }
    });

    return {
        nodes,
        edges,
        intersections,
        totalNodes: nodes.size,
        totalEdges: edges.length,
        totalIntersections: intersections.length
    };
}

// Kavşakları haritada göster
function createIntersectionLayer(graph) {
    const markers = [];

    graph.intersections.forEach(node => {
        const coordinate = node.coordinate;

        markers.push(
            L.circleMarker(
                [coordinate[1], coordinate[0]],
                {
                    radius: 3,
                    color: "#ffffff",
                    weight: 1,
                    fillColor: "#f0a85b",
                    fillOpacity: 0.9
                }
            )
        );
    });

    return L.layerGroup(markers).addTo(map);
}

// Yol verisini yükle
fetch("data/districts/beytepe_roads.geojson")
    .then(response => {
        if (!response.ok) {
            throw new Error(
                "Road GeoJSON could not be loaded."
            );
        }

        return response.json();
    })
    .then(data => {
        const roadsLayer = L.geoJSON(data, {
            style: roadStyle,

            onEachFeature: (feature, layer) => {
                const name =
                    getRoadProperty(feature, "name") ||
                    "Unnamed road";

                const type =
                    getRoadProperty(feature, "highway") ||
                    "Unknown";

                layer.bindPopup(
                    `<b>${name}</b><br>Road type: ${type}`
                );
            }
        }).addTo(map);

        const roadLines = extractRoadLines(data);
        const graph = buildRoadGraph(roadLines);

        const intersectionLayer =
            createIntersectionLayer(graph);

        // Harita ve yol verilerini oyun motoruna aktar
        window.gameMap = map;
        window.roadGraph = graph;
        window.roadLines = roadLines;
        window.roadLayer = roadsLayer;
        window.intersectionLayer = intersectionLayer;

        // Önce Beytepe'yi göster, sonra oyun alanına yaklaş
        showBeytepeOverviewThenParking(
            roadsLayer.getBounds()
        );

        console.log("===== GEOBUS JAM GRAPH =====");
        console.log("Road features:", data.features.length);
        console.log("Road lines:", roadLines.length);
        console.log("Nodes:", graph.totalNodes);
        console.log("Edges:", graph.totalEdges);
        console.log(
            "Intersections:",
            graph.totalIntersections
        );
        console.log("Parking center:", PARKING_CENTER);
        console.log("Graph:", graph);
        console.log("============================");

        updateGameStatus(
            `Graph ready | ${graph.totalNodes} nodes | ` +
            `${graph.totalEdges} edges | ` +
            `${graph.totalIntersections} intersections`
        );
    })
    .catch(error => {
        console.error("Road network error:", error);

        updateGameStatus(
            "Road network loading error"
        );
    });