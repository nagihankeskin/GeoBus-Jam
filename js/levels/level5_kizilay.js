window.GEOBUS_LEVELS = window.GEOBUS_LEVELS || {};

window.GEOBUS_LEVELS[5] = {
    number: 5,
    name: "Kızılay",
    geojsonPath: "data/districts/kizilay_roads.geojson",
    center: [39.9208, 32.8541],
    zoom: 17,
    hubCoord: [39.9208, 32.8541],
    bayCount: 3,
    timeLimit: 165,
    totalPassengers: 264,

    buses: [
        // KUZEY (Atatürk Blv. Kuzey): K01 -> K06 -> K11 -> K16
        { id: "K01", color: "red",    capacity: 16, blockedBy: [],      path: [[39.9214, 32.8541], [39.9211, 32.8541], [39.9208, 32.8541]] },
        { id: "K06", color: "yellow", capacity: 16, blockedBy: ["K01"], path: [[39.9220, 32.8541], [39.9214, 32.8541], [39.9208, 32.8541]] },
        { id: "K11", color: "blue",   capacity: 16, blockedBy: ["K06"], path: [[39.9226, 32.8541], [39.9220, 32.8541], [39.9208, 32.8541]] },
        { id: "K16", color: "green",  capacity: 12, blockedBy: ["K11"], path: [[39.9232, 32.8541], [39.9226, 32.8541], [39.9208, 32.8541]] },

        // DOĞU (Ziya Gökalp Cd.): K02 -> K07 -> K12 -> K17
        { id: "K02", color: "blue",   capacity: 16, blockedBy: [],      path: [[39.9208, 32.8550], [39.9208, 32.8545], [39.9208, 32.8541]] },
        { id: "K07", color: "pink",   capacity: 16, blockedBy: ["K02"], path: [[39.9208, 32.8558], [39.9208, 32.8550], [39.9208, 32.8541]] },
        { id: "K12", color: "green",  capacity: 16, blockedBy: ["K07"], path: [[39.9208, 32.8566], [39.9208, 32.8558], [39.9208, 32.8541]] },
        { id: "K17", color: "yellow", capacity: 12, blockedBy: ["K12"], path: [[39.9208, 32.8574], [39.9208, 32.8566], [39.9208, 32.8541]] },

        // GÜNEY (Atatürk Blv. Güney): K03 -> K08 -> K13 -> K18
        { id: "K03", color: "green",  capacity: 16, blockedBy: [],      path: [[39.9202, 32.8541], [39.9205, 32.8541], [39.9208, 32.8541]] },
        { id: "K08", color: "red",    capacity: 16, blockedBy: ["K03"], path: [[39.9196, 32.8541], [39.9202, 32.8541], [39.9208, 32.8541]] },
        { id: "K13", color: "pink",   capacity: 16, blockedBy: ["K08"], path: [[39.9190, 32.8541], [39.9196, 32.8541], [39.9208, 32.8541]] },
        { id: "K18", color: "blue",   capacity: 12, blockedBy: ["K13"], path: [[39.9184, 32.8541], [39.9190, 32.8541], [39.9208, 32.8541]] },

        // BATI (GMK Blv.): K04 -> K09 -> K14
        { id: "K04", color: "yellow", capacity: 16, blockedBy: [],      path: [[39.9208, 32.8532], [39.9208, 32.8536], [39.9208, 32.8541]] },
        { id: "K09", color: "blue",   capacity: 16, blockedBy: ["K04"], path: [[39.9208, 32.8524], [39.9208, 32.8532], [39.9208, 32.8541]] },
        { id: "K14", color: "red",    capacity: 12, blockedBy: ["K09"], path: [[39.9208, 32.8516], [39.9208, 32.8524], [39.9208, 32.8541]] },

        // KUZEYDOĞU (Mithatpaşa / Meşrutiyet): K05 -> K10 -> K15
        { id: "K05", color: "pink",   capacity: 16, blockedBy: [],      path: [[39.9213, 32.8548], [39.9210, 32.8544], [39.9208, 32.8541]] },
        { id: "K10", color: "green",  capacity: 12, blockedBy: ["K05"], path: [[39.9218, 32.8555], [39.9213, 32.8548], [39.9208, 32.8541]] },
        { id: "K15", color: "yellow", capacity: 12, blockedBy: ["K10"], path: [[39.9223, 32.8562], [39.9218, 32.8555], [39.9208, 32.8541]] }
    ],

    // 66 Grup x 4 = 264 Yolcu (3 Park Cebi, %100 Çözülebilir)
    groups: [
        ["red", 4], ["blue", 4], ["red", 4], ["red", 4], ["red", 4],
        ["green", 4], ["blue", 4], ["blue", 4], ["blue", 4],
        ["yellow", 4], ["green", 4], ["green", 4], ["green", 4],
        ["pink", 4], ["yellow", 4], ["yellow", 4], ["yellow", 4],
        ["pink", 4], ["pink", 4], ["pink", 4],

        ["yellow", 4], ["pink", 4], ["yellow", 4], ["yellow", 4], ["yellow", 4],
        ["red", 4], ["pink", 4], ["pink", 4], ["pink", 4],
        ["blue", 4], ["red", 4], ["red", 4], ["red", 4],
        ["green", 4], ["blue", 4], ["blue", 4], ["blue", 4],
        ["green", 4], ["green", 4],

        ["blue", 4], ["green", 4], ["blue", 4], ["blue", 4], ["blue", 4],
        ["pink", 4], ["green", 4], ["green", 4], ["green", 4],
        ["red", 4], ["pink", 4], ["pink", 4], ["pink", 4],
        ["yellow", 4], ["red", 4], ["red", 4],
        ["yellow", 4], ["yellow", 4],

        ["green", 4], ["yellow", 4], ["green", 4], ["green", 4],
        ["blue", 4], ["yellow", 4], ["yellow", 4],
        ["blue", 4], ["blue", 4]
    ]
};