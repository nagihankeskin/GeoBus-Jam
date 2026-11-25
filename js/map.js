
// =====================================
// GEOBUS JAM - ANKARA INTERACTIVE MAP
// =====================================

// Initialize the map
const map = L.map("map").setView(
    [39.9208, 32.8541],
    13
);

// Add OpenStreetMap tiles
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }
).addTo(map);

// Temporary map center marker
L.marker([39.9208, 32.8541])
    .addTo(map)
    .bindPopup("Ankara - GeoBus Jam");

// Make map available for other modules
window.gameMap = map;
