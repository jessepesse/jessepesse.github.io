# Minimalist Glassmorphism Startpage

A high-performance, aesthetically pleasing browser startpage designed for power users. Built with pure HTML, CSS, and Vanilla JavaScript to ensure zero bloat and maximum speed.

> **Note:** This project was built for personal use. As a result, the user interface (dates, greetings, and labels) is localized in **Finnish**.

## 🎨 Visuals & Design

* **Glassmorphism UI:** Features a dark, modern aesthetic with translucent cards, blur effects, and smooth transitions.
* **Zero Framework Bloat:** No React, Vue, or Webpack. Just clean code.
* **Responsive:** Built on the Bootstrap Grid system, scaling perfectly from desktop to mobile.
* **Typography:** Uses `Fira Sans` for a clean, legible look.

## 🚀 Key Features

### Core Functionality

* **Real-time Clock:** Displays time with seconds.
* **Dynamic Greeting:** Changes based on the time of day (Huomenta/Päivää/Iltaa) and displays the date in Finnish format.
* **Smart Search:**
  * **Bangs:** Supports DuckDuckGo-style bangs (e.g., `y!` for YouTube, `gh!` for GitHub, `s!` for Steam).
  * **Smart Input:** Detects if you are typing a command or a generic search.

### Power User Tools

* **Keyboard Shortcuts:** Navigate without the mouse (e.g., press `R` to open Reddit). Shortcuts are disabled when typing in input fields or editing settings.
* **Focus Mode 👁️:** A "Zen" toggle that blurs all distractions (link cards), leaving only the time and search bar visible.
* **Cheat Sheet:** A CSS-only hover module in the bottom-right corner displaying available shortcuts and bangs.

### Weather Widget ⛅

* **Data Source:** Powered by the [Open-Meteo API](https://open-meteo.com/) (No API keys required).
* **Features:**
  * Current temperature, "Feels like" temp, and wind speed.
  * **Rain/Snow Forecast:** Warns if precipitation is expected in the next 6 hours.
  * **Geolocation:** Supports automatic GPS location with **reverse geocoding** (displays city name, not raw coordinates) or manual city search via the Settings Panel.
  * **Location Display:** Shows your current location (e.g., "OULU, FI") next to the weather data.

## ⚙️ Configuration & Customization

The startpage is designed to be fully configurable directly from the UI, without touching the code.

1. **Edit Mode (⚙️ Gear Icon):**
   * Click the gear icon to enter Edit Mode.
   * **Unified Right Sidebar:** A full-height panel slides in from the right with smooth animation.
   * **Push Layout:** Main content shifts left when the sidebar is open, ensuring nothing is obscured.
   * **Edit Buttons:** Each link, bang, and shortcut displays ✏️ (edit) and ✖ (delete) buttons in Edit Mode.
   * **Manage Links:** Add, delete, or **edit** links and groups visually.
   * **Manage Shortcuts:** Add, delete, or **edit** custom search bangs and keyboard shortcuts.
   * **Smart URL:** When adding a search bang, the system guides you to use `TEST` placeholders for URLs.

2. **Settings Panel (in Sidebar):**
   * Appears only in Edit Mode as part of the unified right sidebar.
   * **Location Search:** Type a city name to set the weather location manually, powered by Open-Meteo Geocoding API.
   * **GPS Support:** Use your device's GPS to automatically detect and set your location with reverse geocoding (shows city name, not coordinates).
   * **Import/Export:** Save your configuration to a JSON file (clipboard) to sync between devices.
   * **Reset:** Restore factory defaults with one click.

## 💾 Data Persistence

All configurations (links, location, theme settings) are saved to your browser's `localStorage`. No external database or login is required.

## 🛠️ Tech Stack

* **HTML5**
* **CSS3** (Variables, Flexbox, Backdrop-filter, Transitions)
* **JavaScript** (ES6+, Async/Await)
* **Bootstrap 5.3.3** (Grid only, no jQuery dependency)
* **Line Awesome** (Icons)
* **FontAwesome 5** (Icons)

## 📝 Recent Updates

### v2.0 (November 2025)

* **Bootstrap 5 Migration:** Upgraded from Bootstrap 4.4.1 to 5.3.3, removed jQuery dependency.
* **Edit Functionality:** Added ✏️ edit buttons for links, search bangs, and keyboard shortcuts. No need to delete and recreate items to fix typos.
* **Unified Sidebar:** Consolidated settings into a full-height right sidebar with smooth slide animation and push layout.
* **Reverse Geocoding:** GPS location now displays city names (e.g., "Oulu, FI") instead of generic "GPS, LOC" by querying Open-Meteo Geocoding API.
* **Improved UX:** Sidebar slides in/out smoothly with `translateX` animation. Close button (✖) added for intuitive dismissal.
* **Hover Help:** Question mark icon in bottom-right reveals help panel on hover (only when not in Edit Mode).
