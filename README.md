# 🚌 GeoBus Jam — Ankara Road Adventure

**GMT 458 – Web GIS | Assignment 2: GeoGame**  
**Live Demo (GitHub Pages):** `https://nagihankeskin.github.io/GeoBus-Jam/`

---

## 1. Game Description & Functional Requirements

**GeoBus Jam** is an interactive, browser-based geographic puzzle game inspired by *Car Jam* and built directly on **Ankara's real road network** using OpenStreetMap GeoJSON data.

Players manage traffic congestion across **6 districts of Ankara** (Beytepe, Ümitköy, Söğütözü, Eryaman, Kızılay, and Ulus). Colored buses are positioned along real road segments around major district intersections and block one another in traffic chains. Players must select unblocked buses in the right order to drive them along real road coordinates to the district's boarding bays, match waiting passenger groups by color without splitting groups, and clear every district before time runs out.

### Functional Requirements
- **Real Spatial Gameplay:** Buses are placed at real `[lat, lng]` coordinates, automatically oriented using geographic bearing calculations, and animated smoothly along GeoJSON road paths.
- **Traffic Blocking & Path Clearance:** Rear buses are blocked by front buses along each road branch; clicking a blocked bus triggers a visual shake feedback.
- **Color & Capacity Matching:** Waiting passengers are displayed as colored human silhouettes at the station dock. Whole groups (4 passengers each) board matching buses parked in slanted bays.
- **Deadlock Detection:** If all parking bays are occupied and no parked bus matches the front passenger group, the attempt fails and costs 1 life.
- **Responsive Design:** Fully playable on desktop and mobile screens using fluid layouts (`100dvh`) and touch-friendly controls.

---

## 2. Frontend Layout & Sketch

```text
+-----------------------------------------------------------------------+
| [🚌 GeoBus Jam]                    [LEVEL 1/6] [TIME] [♥ ♥ ♥] [SCORE] |
+-----------------------------------------------------------------------+
| [● Level 1 - Beytepe]     +-----------------------------+  [↻ RESTART]|
|                           | [120]  [🚌 BEYTEPE]         |             |
|                           | QUEUE  [🧍🧍🧍🧍🧍🧍🧍🧍]   |             |
|                           |  [ P1 ] [ P2 ] [ P3 ] [ P4 ]|             |
|                           +-----------------------------+             |
|                                                                       |
|                     INTERACTIVE LEAFLET MAP                           |
|            (Real Ankara District Roads + Bus Markers ➜)               |
|                          [🚏 Station Hub]                             |
|                                                                       |
|              [ Game in progress | Tap a bus to move! ]                |
+-----------------------------------------------------------------------+
| GeoBus Jam            GMT 458 - Web GIS            📍 Ankara, Türkiye |
+-----------------------------------------------------------------------+