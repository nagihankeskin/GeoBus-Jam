window.GEOBUS_LEVELS = window.GEOBUS_LEVELS || {};

window.GEOBUS_LEVELS[3] = {
    number: 3,
    name: "Söğütözü",
    geojsonPath: "data/districts/sogutozu_roads.geojson",
    center: [39.9135, 32.8085],
    zoom: 17,
    hubCoord: [39.9135, 32.8085],
    bayCount: 3,
    timeLimit: 130,
    totalPassengers: 180,

    buses: [
        // KUZEY KOLU: S01 -> S05 -> S09 -> S13
        { id: "S01", color: "yellow", capacity: 12, blockedBy: [], path: [[39.9141, 32.8085], [39.9138, 32.8085], [39.9135, 32.8085]] },
        { id: "S05", color: "green", capacity: 16, blockedBy: ["S01"], path: [[39.9147, 32.8085], [39.9141, 32.8085], [39.9135, 32.8085]] },
        { id: "S09", color: "green", capacity: 16, blockedBy: ["S05"], path: [[39.9153, 32.8085], [39.9147, 32.8085], [39.9135, 32.8085]] },
        { id: "S13", color: "yellow", capacity: 12, blockedBy: ["S09"], path: [[39.9159, 32.8085], [39.9153, 32.8085], [39.9135, 32.8085]] },

        // DOĞU KOLU: S02 -> S06 -> S10
        { id: "S02", color: "red", capacity: 12, blockedBy: [], path: [[39.9135, 32.8094], [39.9135, 32.8089], [39.9135, 32.8085]] },
        { id: "S06", color: "red", capacity: 16, blockedBy: ["S02"], path: [[39.9135, 32.8102], [39.9135, 32.8094], [39.9135, 32.8085]] },
        { id: "S10", color: "red", capacity: 16, blockedBy: ["S06"], path: [[39.9135, 32.8110], [39.9135, 32.8102], [39.9135, 32.8085]] },

        // GÜNEY KOLU: S03 -> S07 -> S11
        { id: "S03", color: "blue", capacity: 12, blockedBy: [], path: [[39.9129, 32.8085], [39.9132, 32.8085], [39.9135, 32.8085]] },
        { id: "S07", color: "blue", capacity: 16, blockedBy: ["S03"], path: [[39.9123, 32.8085], [39.9129, 32.8085], [39.9135, 32.8085]] },
        { id: "S11", color: "yellow", capacity: 12, blockedBy: ["S07"], path: [[39.9117, 32.8085], [39.9123, 32.8085], [39.9135, 32.8085]] },

        // BATI KOLU: S04 -> S08 -> S12
        { id: "S04", color: "green", capacity: 12, blockedBy: [], path: [[39.9135, 32.8076], [39.9135, 32.8081], [39.9135, 32.8085]] },
        { id: "S08", color: "yellow", capacity: 12, blockedBy: ["S04"], path: [[39.9135, 32.8068], [39.9135, 32.8076], [39.9135, 32.8085]] },
        { id: "S12", color: "blue", capacity: 16, blockedBy: ["S08"], path: [[39.9135, 32.8060], [39.9135, 32.8068], [39.9135, 32.8085]] }
    ],

    
    // 45 Grup x 4 = 180 Yolcu (3 park cebiyle %100 çözülebilir)
    groups: [
        ["yellow", 4], ["red", 4], ["yellow", 4], ["yellow", 4],
        ["blue", 4], ["red", 4], ["green", 4], ["red", 4],
        ["blue", 4], ["green", 4], ["blue", 4],
        ["yellow", 4], ["green", 4],
        ["yellow", 4], ["red", 4], ["yellow", 4],
        ["blue", 4], ["red", 4], ["blue", 4], ["red", 4], ["red", 4],
        ["green", 4], ["blue", 4], ["green", 4], ["blue", 4],
        ["yellow", 4], ["green", 4], ["yellow", 4], ["green", 4],
        ["yellow", 4],
        ["green", 4], ["red", 4], ["green", 4], ["green", 4], ["green", 4],
        ["blue", 4], ["red", 4], ["red", 4], ["red", 4],
        ["yellow", 4], ["blue", 4], ["yellow", 4], ["blue", 4], ["blue", 4],
        ["yellow", 4]
    ]
};