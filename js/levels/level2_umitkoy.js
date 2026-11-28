window.GEOBUS_LEVELS = window.GEOBUS_LEVELS || {};

window.GEOBUS_LEVELS[2] = {
    number: 2,
    name: "Ümitköy",
    geojsonPath: "data/districts/umitkoy_roads.geojson",
    center: [39.9032, 32.7002],
    zoom: 17,
    hubCoord: [39.9034, 32.7005],
    timeLimit: 120,
    totalPassengers: 160,
    buses: [
        { id: "U01", color: "red", capacity: 12, blockedBy: [], path: [[39.9039, 32.7001], [39.9036, 32.7003], [39.9034, 32.7005]] },
        { id: "U02", color: "blue", capacity: 12, blockedBy: ["U01"], path: [[39.9044, 32.6998], [39.9039, 32.7001], [39.9034, 32.7005]] },
        { id: "U11", color: "yellow", capacity: 12, blockedBy: ["U02"], path: [[39.9049, 32.6995], [39.9044, 32.6998], [39.9034, 32.7005]] },
        { id: "U03", color: "green", capacity: 12, blockedBy: [], path: [[39.9032, 32.7014], [39.9033, 32.7009], [39.9034, 32.7005]] },
        { id: "U04", color: "yellow", capacity: 12, blockedBy: ["U03"], path: [[39.9030, 32.7021], [39.9032, 32.7014], [39.9034, 32.7005]] },
        { id: "U09", color: "red", capacity: 16, blockedBy: ["U04"], path: [[39.9028, 32.7028], [39.9030, 32.7021], [39.9034, 32.7005]] },
        { id: "U05", color: "blue", capacity: 12, blockedBy: [], path: [[39.9026, 32.7004], [39.9030, 32.7005], [39.9034, 32.7005]] },
        { id: "U06", color: "red", capacity: 12, blockedBy: ["U05"], path: [[39.9020, 32.7003], [39.9026, 32.7004], [39.9034, 32.7005]] },
        { id: "U10", color: "blue", capacity: 16, blockedBy: ["U06"], path: [[39.9014, 32.7002], [39.9020, 32.7003], [39.9034, 32.7005]] },
        { id: "U07", color: "yellow", capacity: 16, blockedBy: [], path: [[39.9035, 32.6993], [39.9034, 32.6999], [39.9034, 32.7005]] },
        { id: "U08", color: "green", capacity: 16, blockedBy: ["U07"], path: [[39.9036, 32.6985], [39.9035, 32.6993], [39.9034, 32.7005]] },
        { id: "U12", color: "green", capacity: 12, blockedBy: ["U08"], path: [[39.9037, 32.6977], [39.9036, 32.6985], [39.9034, 32.7005]] }
    ],
    groups: [
        ["red", 4], ["green", 4], ["blue", 4], ["yellow", 4],
        ["red", 4], ["blue", 4], ["yellow", 4], ["green", 4],
        ["yellow", 4], ["red", 4], ["green", 4], ["blue", 4],
        ["blue", 4], ["yellow", 4], ["red", 4], ["green", 4],
        ["green", 4], ["red", 4], ["blue", 4], ["yellow", 4],
        ["red", 4], ["yellow", 4], ["green", 4], ["blue", 4],
        ["blue", 4], ["green", 4], ["red", 4], ["yellow", 4],
        ["yellow", 4], ["blue", 4], ["green", 4], ["red", 4],
        ["green", 4], ["yellow", 4], ["blue", 4], ["red", 4],
        ["red", 4], ["blue", 4], ["yellow", 4], ["green", 4]
    ]
};