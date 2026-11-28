window.GEOBUS_LEVELS = window.GEOBUS_LEVELS || {};

window.GEOBUS_LEVELS[6] = {
    number: 6,
    name: "Ulus",
    geojsonPath: "data/districts/ulus_roads.geojson",
    center: [39.9416, 32.8543],
    zoom: 17,
    hubCoord: [39.9416, 32.8543],
    bayCount: 3,
    timeLimit: 190,
    totalPassengers: 312,

    buses: [
        // KUZEY (Çankırı Cd.): L01 -> L06 -> L11 -> L16
        { id: "L01", color: "orange", capacity: 16, blockedBy: [],      path: [[39.9422, 32.8543], [39.9419, 32.8543], [39.9416, 32.8543]] },
        { id: "L06", color: "blue",   capacity: 16, blockedBy: ["L01"], path: [[39.9428, 32.8543], [39.9422, 32.8543], [39.9416, 32.8543]] },
        { id: "L11", color: "pink",   capacity: 16, blockedBy: ["L06"], path: [[39.9434, 32.8543], [39.9428, 32.8543], [39.9416, 32.8543]] },
        { id: "L16", color: "red",    capacity: 16, blockedBy: ["L11"], path: [[39.9440, 32.8543], [39.9434, 32.8543], [39.9416, 32.8543]] },

        // DOĞU (Anafartalar Cd.): L02 -> L07 -> L12 -> L17
        { id: "L02", color: "red",    capacity: 16, blockedBy: [],      path: [[39.9416, 32.8552], [39.9416, 32.8547], [39.9416, 32.8543]] },
        { id: "L07", color: "green",  capacity: 16, blockedBy: ["L02"], path: [[39.9416, 32.8560], [39.9416, 32.8552], [39.9416, 32.8543]] },
        { id: "L12", color: "orange", capacity: 16, blockedBy: ["L07"], path: [[39.9416, 32.8568], [39.9416, 32.8560], [39.9416, 32.8543]] },
        { id: "L17", color: "yellow", capacity: 16, blockedBy: ["L12"], path: [[39.9416, 32.8576], [39.9416, 32.8568], [39.9416, 32.8543]] },

        // GÜNEY (Atatürk Blv.): L03 -> L08 -> L13 -> L18
        { id: "L03", color: "blue",   capacity: 16, blockedBy: [],      path: [[39.9410, 32.8543], [39.9413, 32.8543], [39.9416, 32.8543]] },
        { id: "L08", color: "yellow", capacity: 16, blockedBy: ["L03"], path: [[39.9404, 32.8543], [39.9410, 32.8543], [39.9416, 32.8543]] },
        { id: "L13", color: "red",    capacity: 16, blockedBy: ["L08"], path: [[39.9398, 32.8543], [39.9404, 32.8543], [39.9416, 32.8543]] },
        { id: "L18", color: "green",  capacity: 16, blockedBy: ["L13"], path: [[39.9392, 32.8543], [39.9398, 32.8543], [39.9416, 32.8543]] },

        // BATI (Cumhuriyet Cd.): L04 -> L09 -> L14 -> L19
        { id: "L04", color: "green",  capacity: 16, blockedBy: [],      path: [[39.9416, 32.8534], [39.9416, 32.8538], [39.9416, 32.8543]] },
        { id: "L09", color: "pink",   capacity: 16, blockedBy: ["L04"], path: [[39.9416, 32.8526], [39.9416, 32.8534], [39.9416, 32.8543]] },
        { id: "L14", color: "yellow", capacity: 16, blockedBy: ["L09"], path: [[39.9416, 32.8518], [39.9416, 32.8526], [39.9416, 32.8543]] },
        { id: "L19", color: "orange", capacity: 12, blockedBy: ["L14"], path: [[39.9416, 32.8510], [39.9416, 32.8518], [39.9416, 32.8543]] },

        // KUZEYBATI (İstiklal Cd.): L05 -> L10 -> L15 -> L20
        { id: "L05", color: "pink",   capacity: 16, blockedBy: [],      path: [[39.9421, 32.8536], [39.9418, 32.8540], [39.9416, 32.8543]] },
        { id: "L10", color: "orange", capacity: 16, blockedBy: ["L05"], path: [[39.9426, 32.8529], [39.9421, 32.8536], [39.9416, 32.8543]] },
        { id: "L15", color: "blue",   capacity: 16, blockedBy: ["L10"], path: [[39.9431, 32.8522], [39.9426, 32.8529], [39.9416, 32.8543]] },
        { id: "L20", color: "pink",   capacity: 12, blockedBy: ["L15"], path: [[39.9436, 32.8515], [39.9431, 32.8522], [39.9416, 32.8543]] }
    ],

    // 78 Grup x 4 = 312 Yolcu (6 Renk, 3 Park Cebi, %100 Çözülebilir)
    groups: [
        ["orange", 4], ["red", 4], ["orange", 4], ["orange", 4], ["orange", 4],
        ["blue", 4], ["red", 4], ["red", 4], ["red", 4],
        ["green", 4], ["blue", 4], ["blue", 4], ["blue", 4],
        ["pink", 4], ["green", 4], ["green", 4], ["green", 4],
        ["pink", 4], ["pink", 4], ["pink", 4],

        ["blue", 4], ["green", 4], ["blue", 4], ["blue", 4], ["blue", 4],
        ["yellow", 4], ["green", 4], ["green", 4], ["green", 4],
        ["pink", 4], ["yellow", 4], ["yellow", 4], ["yellow", 4],
        ["orange", 4], ["pink", 4], ["pink", 4], ["pink", 4],
        ["orange", 4], ["orange", 4], ["orange", 4],

        ["pink", 4], ["orange", 4], ["pink", 4], ["pink", 4], ["pink", 4],
        ["red", 4], ["orange", 4], ["orange", 4], ["orange", 4],
        ["yellow", 4], ["red", 4], ["red", 4], ["red", 4],
        ["blue", 4], ["yellow", 4], ["yellow", 4], ["yellow", 4],
        ["blue", 4], ["blue", 4], ["blue", 4],

        ["red", 4], ["yellow", 4], ["red", 4], ["red", 4], ["red", 4],
        ["green", 4], ["yellow", 4], ["yellow", 4], ["yellow", 4],
        ["orange", 4], ["green", 4], ["green", 4], ["green", 4],
        ["pink", 4], ["orange", 4], ["orange", 4],
        ["pink", 4], ["pink", 4]
    ]
};