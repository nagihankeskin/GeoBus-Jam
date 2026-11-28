window.GEOBUS_LEVELS = window.GEOBUS_LEVELS || {};

window.GEOBUS_LEVELS[4] = {
    number: 4,
    name: "Eryaman",
    geojsonPath: "data/districts/eryaman_roads.geojson",
    center: [39.9795, 32.6185],
    zoom: 17,
    hubCoord: [39.9795, 32.6185],
    bayCount: 3,
    timeLimit: 145,
    totalPassengers: 216,

    buses: [
        // KUZEY KOLU: E01 -> E06 -> E11 -> E15
        { id: "E01", color: "pink",   capacity: 12, blockedBy: [],      path: [[39.9801, 32.6185], [39.9798, 32.6185], [39.9795, 32.6185]] },
        { id: "E06", color: "blue",   capacity: 16, blockedBy: ["E01"], path: [[39.9807, 32.6185], [39.9801, 32.6185], [39.9795, 32.6185]] },
        { id: "E11", color: "red",    capacity: 16, blockedBy: ["E06"], path: [[39.9813, 32.6185], [39.9807, 32.6185], [39.9795, 32.6185]] },
        { id: "E15", color: "pink",   capacity: 16, blockedBy: ["E11"], path: [[39.9819, 32.6185], [39.9813, 32.6185], [39.9795, 32.6185]] },

        // DOĞU KOLU: E02 -> E07 -> E12
        { id: "E02", color: "red",    capacity: 12, blockedBy: [],      path: [[39.9795, 32.6194], [39.9795, 32.6189], [39.9795, 32.6185]] },
        { id: "E07", color: "yellow", capacity: 16, blockedBy: ["E02"], path: [[39.9795, 32.6202], [39.9795, 32.6194], [39.9795, 32.6185]] },
        { id: "E12", color: "green",  capacity: 16, blockedBy: ["E07"], path: [[39.9795, 32.6210], [39.9795, 32.6202], [39.9795, 32.6185]] },

        // GÜNEY KOLU: E03 -> E08 -> E13
        { id: "E03", color: "blue",   capacity: 12, blockedBy: [],      path: [[39.9789, 32.6185], [39.9792, 32.6185], [39.9795, 32.6185]] },
        { id: "E08", color: "green",  capacity: 12, blockedBy: ["E03"], path: [[39.9783, 32.6185], [39.9789, 32.6185], [39.9795, 32.6185]] },
        { id: "E13", color: "yellow", capacity: 16, blockedBy: ["E08"], path: [[39.9777, 32.6185], [39.9783, 32.6185], [39.9795, 32.6185]] },

        // BATI KOLU: E04 -> E09 -> E14
        { id: "E04", color: "yellow", capacity: 12, blockedBy: [],      path: [[39.9795, 32.6176], [39.9795, 32.6181], [39.9795, 32.6185]] },
        { id: "E09", color: "pink",   capacity: 16, blockedBy: ["E04"], path: [[39.9795, 32.6168], [39.9795, 32.6176], [39.9795, 32.6185]] },
        { id: "E14", color: "blue",   capacity: 16, blockedBy: ["E09"], path: [[39.9795, 32.6160], [39.9795, 32.6168], [39.9795, 32.6185]] },

        // KUZEYBATI KOLU: E05 -> E10
        { id: "E05", color: "green",  capacity: 12, blockedBy: [],      path: [[39.9800, 32.6178], [39.9797, 32.6182], [39.9795, 32.6185]] },
        { id: "E10", color: "red",    capacity: 16, blockedBy: ["E05"], path: [[39.9805, 32.6171], [39.9800, 32.6178], [39.9795, 32.6185]] }
    ],

    // 54 Grup x 4 = 216 Yolcu (5 Renk, 3 Park Cebi, %100 Çözülebilir)
    groups: [
        ["pink", 4], ["red", 4], ["pink", 4], ["pink", 4],
        ["blue", 4], ["red", 4], ["red", 4],
        ["yellow", 4], ["blue", 4], ["blue", 4],
        ["green", 4], ["yellow", 4], ["yellow", 4],
        ["green", 4], ["green", 4],

        ["pink", 4], ["blue", 4], ["pink", 4], ["pink", 4], ["pink", 4],
        ["yellow", 4], ["blue", 4], ["blue", 4], ["blue", 4],
        ["green", 4], ["yellow", 4], ["yellow", 4], ["yellow", 4],
        ["red", 4], ["green", 4], ["green", 4],
        ["red", 4], ["red", 4], ["red", 4],

        ["red", 4], ["green", 4], ["red", 4], ["red", 4], ["red", 4],
        ["yellow", 4], ["green", 4], ["green", 4], ["green", 4],
        ["blue", 4], ["yellow", 4], ["yellow", 4], ["yellow", 4],
        ["pink", 4], ["blue", 4], ["blue", 4], ["blue", 4],
        ["pink", 4], ["pink", 4], ["pink", 4]
    ]
};