# 🚌 GeoBus Jam — Ankara Road Adventure

**A Geographic Traffic Puzzle Game Powered by Web GIS**  
**GMT 458 – Web GIS | Assignment 2: GeoGame**  
https://nagihankeskin.github.io/GeoBus-Jam/

---

## 🌍 About the Project

GeoBus Jam is an interactive, browser-based geographic puzzle game that combines the strategic mechanics of Car Jam with real-world geospatial data.

Developed as part of the GMT 458 – Web GIS course, the game transforms Ankara's road network into an interactive traffic-management puzzle. Using OpenStreetMap data, GeoJSON road networks, and Leaflet, players navigate colored buses through congested streets, manage passenger queues, and solve traffic-blocking challenges.

The game takes players on a journey through six districts of Ankara, where each level introduces a new environment and increasingly challenging traffic situations.

The objective is simple: clear the traffic, transport every passenger, and complete all six districts without running out of lives or time.

---

## 🎯 Game Objectives

Players must strategically move buses through congested road networks while considering road accessibility, vehicle positions, passenger colors, and seating capacities.

To complete a level, players need to:
- Identify buses with an unobstructed route.
- Move buses in the correct order to resolve traffic congestion.
- Navigate buses toward designated passenger boarding areas.
- Match buses with passenger groups of the same color.
- Ensure that each passenger group boards together without being split.
- Manage limited boarding bays and avoid deadlocks.
- Complete each district before the countdown reaches zero.

---

## 🗺️ Six Districts of Ankara

The game features six levels based on different districts of Ankara:

| Level | District | Difficulty |
| :---: | :--- | :--- |
| 01 | Beytepe | Easy |
| 02 | Ümitköy | Easy – Medium |
| 03 | Söğütözü | Medium |
| 04 | Eryaman | Medium – Hard |
| 05 | Kızılay | Hard |
| 06 | Ulus | Expert |

Each district represents a new stage in the player's journey. Levels are unlocked progressively by completing the previous district.

---

## 🕹️ Gameplay Mechanics

### 1. Real-World Geographic Gameplay
Unlike conventional grid-based traffic puzzles, GeoBus Jam is designed around geographic road data.
- Uses OpenStreetMap road network data.
- Integrates road geometries through GeoJSON.
- Displays the interactive environment using Leaflet.
- Uses geographic coordinates to position game objects.
- Supports movement along predefined road paths.

### 2. Traffic Congestion and Bus Movement
Buses can become blocked by other vehicles positioned along the same road segment. Players must identify which buses can move first and clear the road systematically.
- Blocked buses cannot move until their paths are cleared.
- Selecting a blocked bus triggers visual feedback.
- Bus movement follows predefined routes.
- Smooth animations improve the gameplay experience.

### 3. Passenger Matching System
Passengers wait in organized groups at the station. Each group has a specific color and passenger count.
- Buses can transport only passengers of the matching color.
- Each bus has a predefined seating capacity.
- Passenger groups must board together.
- Groups cannot be divided between multiple buses.
- Full buses leave the boarding area automatically.

### 4. Boarding Bays and Deadlock Detection
The game includes temporary boarding bays where buses wait while passengers board. Players must manage the available spaces carefully.

If all boarding bays are occupied and no available bus can accommodate the next passenger group, a deadlock occurs and the player loses one life.

### 5. Time, Lives, and Scoring
Strategic planning and efficient movement are essential to success.
- **Timer:** Each level has a countdown.
- **Lives:** Players begin with three shared lives.
- **Score:** Successful passenger transportation increases the score.
- **Progression:** Completing a level unlocks the next district.
- **Game Over:** Losing all available lives ends the game.

---

## 🖥️ Interface and Design

GeoBus Jam provides a map-centered gaming experience in which the geographic environment remains the main visual element.

The interface includes:
- Interactive Leaflet map.
- Real-world road network visualization.
- Color-coded bus vehicles.
- Passenger queue and boarding areas.
- Level and district information.
- Countdown timer and remaining lives.
- Live score display.
- Restart and game progression controls.

The layout is designed to support both desktop and mobile screens.

---

## 🛠️ Technologies and Tools

| Technology | Purpose |
| :--- | :--- |
| HTML5 | Application structure |
| CSS3 | Interface design and animations |
| JavaScript | Game logic and interactions |
| Leaflet.js | Interactive web mapping |
| OpenStreetMap | Geographic base map |
| GeoJSON | Road network data representation |
| Git & GitHub | Version control and project hosting |
| GitHub Pages | Web application deployment |

---

## 📍 Geospatial Data

The project uses open-access geographic data to create a realistic spatial environment. OpenStreetMap provides the underlying road network, while GeoJSON is used to represent and process road geometries.

Geographic data supports the placement of game elements and the representation of Ankara's urban road structure.

---

## 🚀 Running the Project Locally

To run GeoBus Jam on your local machine:

1. **Clone the repository**
```bash
git clone https://github.com/nagihankeskin/GeoBus-Jam.git
```

2. **Navigate to the project directory**
```bash
cd GeoBus-Jam
```

3. **Start a local development server**
```bash
python -m http.server 5500
```

4. **Open the application**  
Visit: `http://localhost:5500`

Opening the project through a local server is recommended for loading GeoJSON files correctly.

---

## 🤖 AI Usage & Reflections

During the development of GeoBus Jam, AI assistance was used to troubleshoot Leaflet coordinate and map rendering issues, verify deadlock-free level configurations across the six Ankara districts, improve responsive layout styling, and structure the modular JavaScript architecture.

- **AI Interaction URL:** [https://chatgpt.com/c/6b0b32b0-43e8-83eb-988b-d2f001c7eab8](https://chatgpt.com/c/6b0b32b0-43e8-83eb-988b-d2f001c7eab8)

---

## 🎓 Academic Information

- **Course:** GMT 458 – Web GIS
- **Assignment:** Assignment 2 – GeoGame
- **Project:** GeoBus Jam — Ankara Road Adventure

This project demonstrates how Web GIS technologies and open geospatial datasets can be integrated into an interactive game environment. It combines geographic visualization, spatial data handling, JavaScript-based game mechanics, and web application development.

🚌 **Navigate the roads. Clear the traffic. Complete the journey!**  
*GeoBus Jam — Turning Ankara's road network into a playable adventure.*