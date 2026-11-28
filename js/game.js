/* =====================================================
   GEOBUS JAM — REAL MAP + CAR JAM STATION & SILHOUETTES
   6 Districts | Dynamic Bays | Chart.js | Confetti Finale
===================================================== */

(() => {
    "use strict";

    const COLORS = {
        blue:   { body: "#278ce5", dark: "#155b9b", light: "#d9f3ff", name: "Blue" },
        red:    { body: "#ed4963", dark: "#a9213c", light: "#ffe0e7", name: "Red" },
        yellow: { body: "#f3bd3e", dark: "#aa7611", light: "#fff2c7", name: "Yellow" },
        green:  { body: "#39b77a", dark: "#176c47", light: "#ddffed", name: "Green" },
        pink:   { body: "#f062b5", dark: "#a3226f", light: "#ffdcf0", name: "Pink" },
        orange: { body: "#ff8c42", dark: "#b84b0b", light: "#ffe4d1", name: "Orange" }
    };

    const HUB_COORD = [39.87315, 32.73362];

    const LEVELS = [
        {
            number: 1,
            name: "Beytepe",
            center: [39.8726, 32.7335],
            zoom: 17,
            hubCoord: HUB_COORD,
            bayCount: 4,
            timeLimit: 120,
            totalPassengers: 120,
            buses: [
                { id: "B01", color: "blue",   capacity: 8,  blockedBy: [],      path: [[39.87322, 32.73330], [39.87300, 32.73323], [39.87282, 32.73328], HUB_COORD] },
                { id: "B02", color: "red",    capacity: 12, blockedBy: ["B01"], path: [[39.87358, 32.73343], [39.87322, 32.73330], [39.87300, 32.73323], HUB_COORD] },
                { id: "B03", color: "yellow", capacity: 12, blockedBy: [],      path: [[39.87274, 32.73419], [39.87269, 32.73391], [39.87278, 32.73398], HUB_COORD] },
                { id: "B04", color: "green",  capacity: 8,  blockedBy: ["B03"], path: [[39.87289, 32.73486], [39.87277, 32.73446], [39.87274, 32.73419], [39.87269, 32.73391], HUB_COORD] },
                { id: "B05", color: "blue",   capacity: 12, blockedBy: [],      path: [[39.87228, 32.73332], [39.87254, 32.73362], [39.87269, 32.73391], HUB_COORD] },
                { id: "B06", color: "red",    capacity: 12, blockedBy: ["B05"], path: [[39.87177, 32.73311], [39.87207, 32.73320], [39.87228, 32.73332], [39.87254, 32.73362], HUB_COORD] },
                { id: "B07", color: "yellow", capacity: 12, blockedBy: [],      path: [[39.87357, 32.73221], [39.87381, 32.73269], [39.87387, 32.73338], [39.87330, 32.73394], HUB_COORD] },
                { id: "B08", color: "green",  capacity: 16, blockedBy: ["B07"], path: [[39.87312, 32.73149], [39.87339, 32.73190], [39.87357, 32.73221], [39.87381, 32.73269], HUB_COORD] },
                { id: "B09", color: "yellow", capacity: 12, blockedBy: ["B04"], path: [[39.87313, 32.73543], [39.87294, 32.73504], [39.87289, 32.73486], [39.87274, 32.73419], HUB_COORD] },
                { id: "B10", color: "green",  capacity: 16, blockedBy: ["B06"], path: [[39.87144, 32.73387], [39.87143, 32.73312], [39.87177, 32.73311], [39.87228, 32.73332], HUB_COORD] }
            ],
            groups: [
                ["blue", 4], ["yellow", 4], ["red", 4], ["green", 4],
                ["blue", 4], ["yellow", 4], ["red", 4], ["green", 4],
                ["blue", 4], ["yellow", 4], ["red", 4], ["green", 4],
                ["blue", 4], ["yellow", 4], ["red", 4], ["green", 4],
                ["blue", 4], ["yellow", 4], ["red", 4], ["green", 4],
                ["yellow", 4], ["red", 4], ["green", 4], ["yellow", 4],
                ["green", 4], ["yellow", 4], ["green", 4], ["yellow", 4],
                ["green", 4], ["green", 4]
            ]
        },
        { number: 2, name: "Ümitköy",  totalPassengers: 160, buses: [], groups: [] },
        { number: 3, name: "Söğütözü", totalPassengers: 180, buses: [], groups: [] },
        { number: 4, name: "Eryaman",  totalPassengers: 216, buses: [], groups: [] },
        { number: 5, name: "Kızılay",  totalPassengers: 264, buses: [], groups: [] },
        { number: 6, name: "Ulus",     totalPassengers: 312, buses: [], groups: [] }
    ];

    const STATE = {
        started: false,
        busy: false,
        currentLevel: 1,
        unlockedLevel: 1,
        lives: 3,
        score: 0,
        moves: 0,
        delivered: 0,
        buses: [],
        queue: [],
        bays: [null, null, null, null],
        gameOver: false,
        completed: false
    };

    let hudElement = null;
    let peopleTrack = null;
    let bayRow = null;
    let busLayerGroup = null;
    let hubMarker = null;
    let currentDistrictRoadLayer = null;

    let timerInterval = null;
    let remainingTime = 120;

    const mapElement = document.getElementById("map");

    function getCurrentLevel() {
        if (window.GEOBUS_LEVELS && window.GEOBUS_LEVELS[STATE.currentLevel]) {
            return window.GEOBUS_LEVELS[STATE.currentLevel];
        }
        return LEVELS[STATE.currentLevel - 1];
    }

    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function say(message) { setText("game-message", message); }
    function updateStatus(message) { setText("game-status", message); }

    function getRemainingPassengers() {
        return STATE.queue.reduce((sum, g) => sum + g.left, 0);
    }

    function getBearing(from, to) {
        const lat1 = from[0] * Math.PI / 180;
        const lat2 = to[0] * Math.PI / 180;
        const dLng = (to[1] - from[1]) * Math.PI / 180;
        const y = Math.sin(dLng) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
        return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
    }

    function loadDistrictRoads(level) {
        if (!level.geojsonPath || !window.gameMap) return;
        if (currentDistrictRoadLayer) {
            window.gameMap.removeLayer(currentDistrictRoadLayer);
            currentDistrictRoadLayer = null;
        }
        fetch(level.geojsonPath)
            .then(res => (res.ok ? res.json() : null))
            .then(data => {
                if (!data) return;
                currentDistrictRoadLayer = L.geoJSON(data, {
                    style: { color: "#9b87cc", weight: 2.2, opacity: 0.85 }
                }).addTo(window.gameMap);
            })
            .catch(err => console.warn("District roads warning:", err));
    }

    function createHUD() {
        if (hudElement) return;

        hudElement = document.createElement("div");
        hudElement.id = "gb-hud";
        hudElement.innerHTML = `
            <div class="gb-station-dock">
                <div class="gb-station-top">
                    <div class="gb-queue-sign">
                        <strong id="gb-queue-count">120</strong>
                        <span>QUEUE</span>
                    </div>
                    <div class="gb-station-shelter">
                        <div class="gb-shelter-roof">
                            <span>🚌</span>
                            <strong id="gb-station-name">BEYTEPE</strong>
                        </div>
                        <div class="gb-people-track" id="gb-people-track"></div>
                    </div>
                </div>
                <div class="gb-slanted-bays" id="gb-slanted-bays"></div>
            </div>
            <button class="gb-reset-btn" id="gb-reset-button">↻ RESTART</button>
        `;

        mapElement.parentElement.appendChild(hudElement);
        peopleTrack = hudElement.querySelector("#gb-people-track");
        bayRow = hudElement.querySelector("#gb-slanted-bays");
        hudElement.querySelector("#gb-reset-button").addEventListener("click", restartLevel);
        injectStyles();
    }

    function injectStyles() {
        if (document.getElementById("gb-carjam-styles")) return;
        const style = document.createElement("style");
        style.id = "gb-carjam-styles";
        style.textContent = `
            #gb-hud { position:absolute; inset:0; z-index:800; pointer-events:none; font-family:"Segoe UI",Arial,sans-serif; user-select:none; }
            .gb-station-dock { position:absolute; top:12px; left:50%; transform:translateX(-50%); width:min(560px,calc(100% - 250px)); padding:10px 16px 14px; border-radius:18px; border:2px solid rgba(255,255,255,0.35); background:linear-gradient(180deg,rgba(35,31,61,0.94),rgba(52,56,78,0.92)); backdrop-filter:blur(8px); box-shadow:0 12px 32px rgba(0,0,0,0.45); pointer-events:auto; }
            .gb-station-top { display:flex; align-items:center; gap:12px; padding-bottom:10px; border-bottom:2px solid rgba(255,255,255,0.16); }
            .gb-queue-sign { min-width:66px; padding:6px 8px; border-radius:10px; border:2px solid #8fa3bf; background:#1d283a; text-align:center; box-shadow:inset 0 2px 6px rgba(0,0,0,0.5); }
            .gb-queue-sign strong { display:block; font-size:18px; font-weight:900; color:#fff; line-height:1.1; }
            .gb-queue-sign span { display:block; margin-top:2px; font-size:8px; font-weight:900; letter-spacing:1px; color:#ffd34e; }
            .gb-station-shelter { flex:1; min-width:0; }
            .gb-shelter-roof { display:inline-flex; align-items:center; gap:6px; padding:3px 12px; margin-bottom:6px; border-radius:8px; background:linear-gradient(135deg,#a9c4e8,#7394c4); color:#162235; font-size:11px; font-weight:900; letter-spacing:1.2px; }
            .gb-people-track { display:flex; align-items:flex-end; gap:5px; height:34px; padding:4px 8px; border-radius:10px; background:rgba(15,17,30,0.55); border:1px solid rgba(255,255,255,0.15); overflow:hidden; }
            .gb-person { flex:0 0 auto; width:14px; height:24px; display:flex; flex-direction:column; align-items:center; transition:transform 0.2s; }
            .gb-person.first { transform:scale(1.18) translateY(-2px); filter:drop-shadow(0 0 5px #fff); }
            .gb-person-head { width:8px; height:8px; border-radius:50%; background:var(--p-color); border:1.5px solid rgba(255,255,255,0.9); margin-bottom:1px; }
            .gb-person-body { width:12px; height:13px; border-radius:6px 6px 3px 3px; background:var(--p-color); border:1.5px solid rgba(255,255,255,0.85); }
            .gb-slanted-bays { display:flex; justify-content:center; gap:18px; margin-top:12px; padding:4px 10px; }
            .gb-slot { width:82px; height:44px; border:2px dashed rgba(255,255,255,0.55); border-radius:10px; background:rgba(255,255,255,0.08); transform:skewX(-18deg); display:flex; align-items:center; justify-content:center; transition:background 0.25s,border-color 0.25s; }
            .gb-slot.occupied { border-style:solid; border-color:rgba(255,255,255,0.85); background:rgba(255,255,255,0.16); }
            .gb-slot-label { transform:skewX(18deg); font-size:10px; font-weight:900; color:rgba(255,255,255,0.45); }
            .gb-parked-bus { width:72px; height:32px; border-radius:8px; border:2px solid var(--bus-dark); background:linear-gradient(145deg,var(--bus-light),var(--bus-body) 45%,var(--bus-dark)); box-shadow:0 4px 10px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; animation:parkPop 0.3s ease; }
            .gb-parked-bus span { transform:skewX(18deg); font-size:10px; font-weight:900; color:#fff; text-shadow:0 1px 3px #000; }
            @keyframes parkPop { from{transform:scale(0.7);opacity:0;} to{transform:scale(1);opacity:1;} }
            .gb-reset-btn { position:absolute; top:16px; right:18px; padding:10px 14px; border:1px solid rgba(255,255,255,0.35); border-radius:11px; background:rgba(25,21,44,0.92); color:#fff; font-size:11px; font-weight:800; cursor:pointer; pointer-events:auto; backdrop-filter:blur(8px); }
            .gb-map-bus-wrapper { background:transparent; border:none; }
            .gb-map-bus { width:54px; height:26px; border-radius:8px; border:2.5px solid var(--bus-dark); background:linear-gradient(145deg,var(--bus-light),var(--bus-body) 45%,var(--bus-dark)); box-shadow:0 5px 12px rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:space-between; padding:0 6px; cursor:pointer; transition:filter 0.2s; }
            .gb-map-bus:hover { filter:brightness(1.18) drop-shadow(0 0 6px #fff); }
            .gb-bus-arrow { font-size:14px; font-weight:900; color:#fff; text-shadow:0 1px 3px rgba(0,0,0,0.65); line-height:1; }
            .gb-bus-cap { font-size:9px; font-weight:900; padding:1px 4px; border-radius:5px; background:rgba(0,0,0,0.38); color:#fff; }
            .gb-map-bus.blocked-shake { animation:busShake 0.35s ease; outline:2.5px solid #ff657d; }
            @keyframes busShake { 0%,100%{filter:brightness(1);} 25%,75%{filter:brightness(1.45);} 50%{filter:brightness(0.8);} }
            .gb-hub-pin { width:34px; height:34px; border-radius:50%; background:#211e3b; border:3px solid #ffe18a; display:flex; align-items:center; justify-content:center; font-size:16px; box-shadow:0 0 18px rgba(255,225,138,0.85); }
            @media (max-width:750px) {
                .gb-station-dock { top:52px; width:calc(100% - 20px); padding:8px 10px 10px; }
                .gb-slanted-bays { gap:8px; }
                .gb-slot { width:64px; height:36px; }
                .gb-parked-bus { width:56px; height:26px; }
            }
        `;
        document.head.appendChild(style);
    }

    function clearMapEntities() {
        if (busLayerGroup && window.gameMap) window.gameMap.removeLayer(busLayerGroup);
        if (hubMarker && window.gameMap) window.gameMap.removeLayer(hubMarker);
        busLayerGroup = L.layerGroup().addTo(window.gameMap);
    }

    function drawHubOnMap() {
        const level = getCurrentLevel();
        const coord = level.hubCoord || HUB_COORD;
        const hubIcon = L.divIcon({
            className: "gb-map-bus-wrapper",
            html: `<div class="gb-hub-pin">🚏</div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17]
        });
        hubMarker = L.marker(coord, { icon: hubIcon, zIndexOffset: 500 })
            .addTo(window.gameMap)
            .bindTooltip(`${level.name} Station`, { direction: "top" });
    }

    function createBusMarker(bus) {
        const color = COLORS[bus.color];
        const start = bus.path[0];
        const next = bus.path[1] || start;
        const angle = getBearing(start, next) - 90;

        const icon = L.divIcon({
            className: "gb-map-bus-wrapper",
            html: `
                <div class="gb-map-bus" style="--bus-body:${color.body};--bus-dark:${color.dark};--bus-light:${color.light};transform:rotate(${angle}deg);">
                    <span class="gb-bus-cap" style="transform:rotate(${-angle}deg);">${bus.capacity}</span>
                    <span class="gb-bus-arrow">➜</span>
                </div>
            `,
            iconSize: [54, 26],
            iconAnchor: [27, 13]
        });

        const marker = L.marker(start, { icon, zIndexOffset: 300 }).addTo(busLayerGroup);
        marker.bindTooltip(`${bus.id} • ${color.name} (${bus.capacity} seats)`, { direction: "top", offset: [0, -10] });
        marker.on("click", () => sendBus(bus));
        bus.marker = marker;
    }

    function drawAllBuses() {
        clearMapEntities();
        drawHubOnMap();
        STATE.buses.filter(b => !b.exited && b.bay === null).forEach(createBusMarker);
    }

    function animateBusAlongPath(bus, onComplete) {
        const coords = bus.path;
        let segmentIndex = 0;
        let progress = 0;
        const speed = 0.065;

        function step() {
            if (segmentIndex >= coords.length - 1) { onComplete(); return; }
            progress += speed;
            if (progress >= 1) {
                progress = 0;
                segmentIndex++;
                if (segmentIndex >= coords.length - 1) {
                    bus.marker.setLatLng(coords[coords.length - 1]);
                    onComplete();
                    return;
                }
            }
            const p1 = coords[segmentIndex];
            const p2 = coords[segmentIndex + 1];
            bus.marker.setLatLng([p1[0] + (p2[0] - p1[0]) * progress, p1[1] + (p2[1] - p1[1]) * progress]);

            const angle = getBearing(p1, p2) - 90;
            const el = bus.marker.getElement()?.querySelector(".gb-map-bus");
            if (el) {
                el.style.transform = `rotate(${angle}deg)`;
                const cap = el.querySelector(".gb-bus-cap");
                if (cap) cap.style.transform = `rotate(${-angle}deg)`;
            }
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function getBlockingBus(bus) {
        for (const blockerId of bus.blockedBy) {
            const blocker = STATE.buses.find(b => b.id === blockerId);
            if (blocker && !blocker.exited && blocker.bay === null) return blocker;
        }
        return null;
    }

    function sendBus(bus) {
        if (!STATE.started || STATE.busy || STATE.gameOver || bus.exited || bus.bay !== null) return;

        const freeBay = STATE.bays.findIndex(b => b === null);
        if (freeBay === -1) {
            say("All parking bays in front of the station are full!");
            return;
        }

        const blocker = getBlockingBus(bus);
        if (blocker) {
            const el = bus.marker?.getElement()?.querySelector(".gb-map-bus");
            if (el) {
                el.classList.remove("blocked-shake");
                void el.offsetWidth;
                el.classList.add("blocked-shake");
            }
            say(`${bus.id} is blocked by ${blocker.id}! Move ${blocker.id} first.`);
            return;
        }

        STATE.busy = true;
        STATE.moves++;
        say(`${bus.id} is heading to Station Bay P${freeBay + 1}...`);

        animateBusAlongPath(bus, () => {
            if (bus.marker) {
                busLayerGroup.removeLayer(bus.marker);
                bus.marker = null;
            }
            bus.exited = true;
            bus.bay = freeBay;
            STATE.bays[freeBay] = bus.id;
            STATE.busy = false;
            updateStats();
            say(`${bus.id} parked at Bay P${freeBay + 1}.`);
            boardPassengers();
        });
    }

    function boardPassengers() {
        if (!STATE.started || STATE.busy || STATE.queue.length === 0) {
            checkWin();
            return;
        }

        const group = STATE.queue[0];
        const matchingBus = STATE.bays
            .map(id => STATE.buses.find(b => b.id === id))
            .find(b => b && b.color === group.color && (b.capacity - b.boarded) >= group.left);

        if (!matchingBus) {
            say(`Waiting for a ${COLORS[group.color].name} bus (${group.left} seats).`);
            checkDeadlock();
            return;
        }

        const count = group.left;
        STATE.busy = true;
        say(`${count} ${COLORS[group.color].name} passengers boarding ${matchingBus.id}...`);

        let boarded = 0;
        const timer = setInterval(() => {
            group.left--;
            matchingBus.boarded++;
            STATE.delivered++;
            STATE.score += 100;
            boarded++;
            if (group.left === 0) STATE.queue.shift();
            updateStats();

            if (boarded >= count) {
                clearInterval(timer);
                STATE.busy = false;
                if (matchingBus.boarded === matchingBus.capacity) {
                    releaseFullBus(matchingBus);
                } else {
                    boardPassengers();
                }
            }
        }, 130);
    }

    function releaseFullBus(bus) {
        const bayIndex = bus.bay;
        say(`${bus.id} is full and departing!`);
        setTimeout(() => {
            STATE.bays[bayIndex] = null;
            bus.bay = null;
            bus.exited = true;
            updateStats();
            boardPassengers();
            checkWin();
        }, 450);
    }

    function drawPeopleQueue() {
        peopleTrack.innerHTML = "";
        let rendered = 0;
        const MAX_VISIBLE = 24;

        for (const group of STATE.queue) {
            const color = COLORS[group.color];
            for (let i = 0; i < group.left; i++) {
                if (rendered >= MAX_VISIBLE) break;
                const person = document.createElement("div");
                person.className = "gb-person" + (rendered === 0 ? " first" : "");
                person.style.setProperty("--p-color", color.body);
                person.innerHTML = `<div class="gb-person-head"></div><div class="gb-person-body"></div>`;
                peopleTrack.appendChild(person);
                rendered++;
            }
            if (rendered >= MAX_VISIBLE) break;
        }
        setText("gb-queue-count", getRemainingPassengers());
    }

    function drawSlantedBays() {
        bayRow.innerHTML = "";
        STATE.bays.forEach((busId, idx) => {
            const slot = document.createElement("div");
            slot.className = "gb-slot" + (busId ? " occupied" : "");
            slot.dataset.bay = idx;

            if (!busId) {
                slot.innerHTML = `<span class="gb-slot-label">P${idx + 1}</span>`;
            } else {
                const bus = STATE.buses.find(b => b.id === busId);
                if (bus) {
                    const color = COLORS[bus.color];
                    slot.innerHTML = `
                        <div class="gb-parked-bus" style="--bus-body:${color.body};--bus-dark:${color.dark};--bus-light:${color.light};">
                            <span>${bus.boarded}/${bus.capacity}</span>
                        </div>
                    `;
                }
            }
            bayRow.appendChild(slot);
        });
    }

    function updateStats() {
        const level = getCurrentLevel();
        setText("level", `${STATE.currentLevel} / 6`);
        setText("score", STATE.score);
        setText("lives", "♥ ".repeat(STATE.lives).trim() || "0");
        setText("timer", remainingTime);
        setText("current-district-title", `Level ${level.number} – ${level.name}`);
        setText("gb-station-name", level.name.toUpperCase());
        drawPeopleQueue();
        drawSlantedBays();
    }

    function checkDeadlock() {
        if (!STATE.bays.every(Boolean) || STATE.queue.length === 0 || STATE.gameOver) return;
        const nextGroup = STATE.queue[0];
        const canBoard = STATE.bays.some(id => {
            const b = STATE.buses.find(item => item.id === id);
            return b && b.color === nextGroup.color && (b.capacity - b.boarded) >= nextGroup.left;
        });
        if (!canBoard) endGame("GAME OVER — All bays are full and no bus matches the waiting passengers.");
    }

    function endGame(message) {
        if (STATE.gameOver) return;
        STATE.gameOver = true;
        STATE.started = false;
        STATE.busy = false;
        stopTimer();
        STATE.lives = Math.max(0, STATE.lives - 1);
        updateStats();
        updateStatus("GAME OVER");
        say(`${message} Remaining lives: ${STATE.lives}.`);
    }

    function checkWin() {
        if (STATE.queue.length !== 0 || !STATE.buses.every(b => b.exited)) return;
        STATE.started = false;
        STATE.completed = true;
        stopTimer();

        const best = Number(localStorage.getItem("geobus_highscore") || 0);
        if (STATE.score > best) localStorage.setItem("geobus_highscore", STATE.score);

        STATE.unlockedLevel = Math.max(STATE.unlockedLevel, STATE.currentLevel + 1);
        updateStatus("LEVEL COMPLETED");
        say(`🎉 ${getCurrentLevel().name} completed! Lives left: ${STATE.lives}`);
        showNextLevelCard();
    }

    function launchConfetti(container) {
        const colors = ["#ffd34e", "#ff657d", "#54b6ff", "#52d69a", "#f062b5", "#ff8c42", "#d6c4ff"];
        const wrapper = document.createElement("div");
        wrapper.style.cssText = "position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:1600;";
        container.appendChild(wrapper);

        for (let i = 0; i < 90; i++) {
            const piece = document.createElement("div");
            const size = Math.random() * 8 + 6;
            const left = Math.random() * 100;
            const delay = Math.random() * 1.5;
            const duration = Math.random() * 2 + 2.2;
            const color = colors[Math.floor(Math.random() * colors.length)];

            piece.style.cssText = `
                position:absolute;
                top:-20px;
                left:${left}%;
                width:${size}px;
                height:${size * 1.4}px;
                background:${color};
                border-radius:2px;
                opacity:0.95;
                animation: gbConfettiFall ${duration}s linear ${delay}s infinite;
            `;
            wrapper.appendChild(piece);
        }

        if (!document.getElementById("gb-confetti-style")) {
            const style = document.createElement("style");
            style.id = "gb-confetti-style";
            style.textContent = `
                @keyframes gbConfettiFall {
                    0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(105vh) rotate(720deg); opacity: 0.7; }
                }
            `;
            document.head.appendChild(style);
        }

        return wrapper;
    }

    function renderLevelChart(overlay) {
        if (!window.Chart) return;
        const countsByColor = {};
        STATE.buses.forEach(b => {
            countsByColor[b.color] = (countsByColor[b.color] || 0) + b.boarded;
        });

        const labels = Object.keys(countsByColor).map(c => COLORS[c]?.name || c);
        const values = Object.values(countsByColor);
        const bgColors = Object.keys(countsByColor).map(c => COLORS[c]?.body || "#a98af5");

        const ctx = overlay.querySelector("#gb-level-chart");
        if (!ctx) return;

        new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    label: "Passengers Transported",
                    data: values,
                    backgroundColor: bgColors,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { color: "#cfc6e6", font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.08)" } },
                    x: { ticks: { color: "#ffffff", font: { size: 10 } }, grid: { display: false } }
                }
            }
        });
    }

    function showNextLevelCard() {
        const nextNum = STATE.currentLevel + 1;
        const nextLevel = (window.GEOBUS_LEVELS && window.GEOBUS_LEVELS[nextNum]) || LEVELS[nextNum - 1];
        const hasNext = Boolean(nextLevel && nextLevel.buses && nextLevel.buses.length > 0);
        const bestScore = localStorage.getItem("geobus_highscore") || STATE.score;

        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position:absolute; inset:0; z-index:1500; display:flex;
            align-items:center; justify-content:center; background:rgba(16,13,37,0.82);
            backdrop-filter:blur(7px);
        `;

        let confettiEl = null;

        if (!hasNext) {
            confettiEl = launchConfetti(mapElement.parentElement);
            overlay.innerHTML = `
                <div style="width:min(440px,92%); padding:28px; border-radius:22px;
                    background:linear-gradient(145deg,#2c2352,#1c1736); border:2px solid #ffe18a;
                    color:#fff; text-align:center; box-shadow:0 25px 70px #0009; position:relative; z-index:1700;">
                    <div style="font-size:48px">🎉🏆🎉</div>
                    <h2 style="margin:10px 0 4px; font-size:24px; color:#ffe18a;">CONGRATULATIONS!</h2>
                    <p style="color:#d6c4ff; font-size:13px; font-weight:700; margin-bottom:10px;">
                        You cleared all 6 districts of Ankara!
                    </p>
                    <p style="color:#cfc6e6; font-size:12px; line-height:1.7; margin-bottom:10px;">
                        Final Score: <strong>${STATE.score}</strong> • High Score: <strong style="color:#ffe18a">${bestScore}</strong><br>
                        Remaining Lives: <strong style="color:#ff657d">${"♥ ".repeat(STATE.lives)}</strong>
                    </p>
                    <div style="margin:10px 0 16px; background:rgba(255,255,255,0.05); padding:10px; border-radius:12px;">
                        <canvas id="gb-level-chart" height="130"></canvas>
                    </div>
                    <button id="gb-go-next" style="width:100%; padding:14px; border:0; border-radius:12px;
                        background:linear-gradient(135deg,#ffe17b,#ffb93f); color:#392a16;
                        font-weight:900; cursor:pointer; font-size:13px; letter-spacing:1px;">
                        PLAY AGAIN FROM LEVEL 1 ↻
                    </button>
                </div>
            `;
        } else {
            overlay.innerHTML = `
                <div style="width:min(400px,92%); padding:26px; border-radius:20px;
                    background:#252040; border:1px solid rgba(255,255,255,0.3);
                    color:#fff; text-align:center; box-shadow:0 20px 60px #0008;">
                    <div style="font-size:38px">🏆</div>
                    <h2 style="margin:8px 0;">${getCurrentLevel().name} Cleared!</h2>
                    <p style="color:#cfc6e6; font-size:12px; line-height:1.7; margin-bottom:10px;">
                        Score: <strong>${STATE.score}</strong> • High Score: <strong style="color:#ffe18a">${bestScore}</strong><br>
                        Remaining Lives: <strong style="color:#ff657d">${"♥ ".repeat(STATE.lives)}</strong>
                    </p>
                    <div style="margin:10px 0 16px; background:rgba(255,255,255,0.05); padding:10px; border-radius:12px;">
                        <canvas id="gb-level-chart" height="130"></canvas>
                    </div>
                    <button id="gb-go-next" style="width:100%; padding:14px; border:0; border-radius:11px;
                        background:linear-gradient(135deg,#ffe17b,#ffb93f); color:#392a16;
                        font-weight:900; cursor:pointer; font-size:13px;">
                        NEXT LEVEL: ${nextLevel.name.toUpperCase()} →
                    </button>
                </div>
            `;
        }

        mapElement.parentElement.appendChild(overlay);
        renderLevelChart(overlay);

        overlay.querySelector("#gb-go-next").addEventListener("click", () => {
            overlay.remove();
            if (confettiEl) confettiEl.remove();

            if (hasNext) {
                STATE.currentLevel = nextNum;
                loadDistrictRoads(getCurrentLevel());
                startGame();
            } else {
                STATE.currentLevel = 1;
                STATE.lives = 3;
                STATE.score = 0;
                startGame();
            }
        });
    }

    function startTimer() {
        stopTimer();
        timerInterval = setInterval(() => {
            if (!STATE.started || STATE.busy) return;
            remainingTime--;
            setText("timer", remainingTime);
            if (remainingTime <= 0) endGame("TIME IS UP!");
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    }

    function startGame() {
        if (!window.gameMap) return;
        createHUD();
        if (STATE.lives <= 0) { say("No lives remaining."); return; }

        const level = getCurrentLevel();
        STATE.buses = level.buses.map(b => ({ ...b, exited: false, bay: null, boarded: 0, marker: null }));
        STATE.queue = level.groups.map((g, i) => ({ id: `G${i + 1}`, color: g[0], count: g[1], left: g[1] }));

        const bayCount = level.bayCount || 4;
        STATE.bays = Array(bayCount).fill(null);
        STATE.moves = 0;
        STATE.delivered = 0;
        STATE.busy = false;
        STATE.gameOver = false;
        STATE.completed = false;
        STATE.started = true;
        remainingTime = level.timeLimit || 120;

        loadDistrictRoads(level);
        window.gameMap.flyTo(level.center, level.zoom, { animate: true, duration: 1.2 });

        drawAllBuses();
        updateStats();
        updateStatus("Game in progress");
        say("Tap a bus with a clear path to pull into a parking bay!");
        startTimer();
    }

    function restartLevel() {
        if (STATE.lives <= 0) { say("No lives remaining."); return; }
        startGame();
    }

    function goToLevel(levelNum) {
        STATE.currentLevel = levelNum;
        startGame();
    }

    window.GeoBusGame = { startGame, restartLevel, goToLevel };
})();