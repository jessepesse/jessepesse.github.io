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
* **Reverse Geocoding:** Uses [OpenStreetMap Nominatim API](https://nominatim.openstreetmap.org/) to convert GPS coordinates to city names.
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
   * **GPS Support:** Use your device's GPS to automatically detect and set your location. City names are resolved using OpenStreetMap Nominatim reverse geocoding.
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
* **Reverse Geocoding:** GPS location now displays city names (e.g., "Oulu, FI") instead of generic "GPS, LOC" using OpenStreetMap Nominatim API.
* **Improved UX:** Sidebar slides in/out smoothly with `translateX` animation. Close button (✖) added for intuitive dismissal.
* **Hover Help:** Question mark icon in bottom-right reveals help panel on hover (only when not in Edit Mode).
* **Drag & Drop:** Reorder groups and links by dragging in edit mode for easy customization.

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Local web server for development (Python, Node.js, or similar)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jessepesse/jessepesse.github.io.git
   cd jessepesse.github.io
   ```

2. **Start a local server**

   **Option A: Python** (easiest)
   ```bash
   python3 -m http.server 8000
   ```

   **Option B: Node.js**
   ```bash
   npx serve
   ```

   **Option C: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

> **⚠️ Important:** ES6 modules require a web server. Opening `index.html` directly (file://) will not work due to CORS restrictions.

---

## 👨‍💻 Development

### Project Structure

```
jessepesse.github.io/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── js/
│   ├── main.js         # Entry point, initialization
│   ├── config.js       # Constants, defaults, utility functions
│   ├── storage.js      # localStorage management
│   ├── rendering.js    # DOM rendering logic
│   ├── search.js       # Smart search and bangs
│   ├── edit.js         # Edit mode functionality
│   ├── help.js         # Help sidebar management
│   ├── weather.js      # Weather widget + geocoding
│   └── dragdrop.js     # Drag-and-drop reordering
└── README.md           # This file
```

### Module System

The project uses **ES6 modules** for code organization:

- **`main.js`** - Initializes all modules and sets up the app
- **`config.js`** - Exports constants, default config, utility functions
- **`storage.js`** - Handles data persistence with localStorage
- **`rendering.js`** - Renders links and help sidebar
- **`search.js`** - Processes search queries and bang commands
- **`edit.js`** - Manages edit mode, link/group CRUD operations
- **`help.js`** - Manages help items (bangs, shortcuts)
- **`weather.js`** - Weather widget, geocoding, location management
- **`dragdrop.js`** - Drag-and-drop reordering for groups and links

### Making Changes

1. **Edit the code** in your preferred editor
2. **Refresh the browser** (Ctrl+Shift+R for hard refresh)
3. **Test your changes** in edit mode
4. **Check the console** for any errors

### Adding a New Feature

Example: Adding a new utility function

1. **Add to appropriate module** (e.g., `config.js`)
   ```javascript
   export function myNewFunction() {
     // Your code
   }
   ```

2. **Import where needed**
   ```javascript
   import { myNewFunction } from './config.js';
   ```

3. **Test thoroughly**
   - Test in normal mode
   - Test in edit mode
   - Test on mobile (responsive)

### Debugging

**Browser DevTools:**
- **Console** (F12) - View errors and logs
- **Network** - Check API calls (weather, geocoding)
- **Application → Local Storage** - View saved data

**Common Issues:**
- Module errors → Check import paths
- CORS errors → Make sure you're using a web server
- Data not saving → Check localStorage quota

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. **Check existing issues** on GitHub
2. **Create a new issue** with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots if applicable

### Suggesting Features

1. **Open an issue** with the `enhancement` label
2. **Describe the feature** clearly
   - What problem does it solve?
   - How would it work?
   - Any examples or mockups?

### Code Contributions

#### Before You Start

- **Fork the repository**
- **Create a feature branch** (`git checkout -b feature/amazing-feature`)
- **Make your changes**
- **Test thoroughly**

#### Code Style Guidelines

**JavaScript:**
- Use ES6+ features (modules, arrow functions, const/let)
- Descriptive variable names (`draggedGroupElement` not `dge`)
- Add JSDoc comments for exported functions
- Keep functions small and focused

**CSS:**
- Use CSS variables for colors and spacing
- Organize by component
- Comment sections clearly
- Mobile-first responsive design

**Commits:**
- Clear, descriptive commit messages
- Use conventional commits format:
  ```
  feat: Add drag-and-drop for links
  fix: Resolve geocoding cache issue
  docs: Update README with setup instructions
  refactor: Extract magic numbers to constants
  ```

#### Pull Request Process

1. **Update documentation** if needed
2. **Test your changes** extensively
   - Desktop browsers (Chrome, Firefox, Edge)
   - Mobile browsers (iOS Safari, Chrome Android)
   - Edit mode and normal mode
   - localStorage persistence

3. **Create a pull request** with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots/GIFs for UI changes

4. **Wait for review**
   - Address any feedback
   - Keep the PR focused on one feature/fix

### Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/jessepesse.github.io.git
cd jessepesse.github.io

# 2. Create a branch
git checkout -b feature/my-feature

# 3. Make changes and test
python3 -m http.server 8000

# 4. Commit
git add .
git commit -m "feat: Add my awesome feature"

# 5. Push
git push origin feature/my-feature

# 6. Create Pull Request on GitHub
```

---

## 📄 License

This project is open source and available for personal use. Feel free to fork and modify for your own needs.

---

## 🙏 Acknowledgments

- **Open-Meteo API** - Weather data and forward geocoding
- **OpenStreetMap Nominatim** - Reverse geocoding
- **Bootstrap 5** - Grid system
- **Line Awesome** & **FontAwesome** - Icons
- **Google Fonts** - Fira Sans typography

---

## 📞 Contact

**Jesse Pesse**
- GitHub: [@jessepesse](https://github.com/jessepesse)
- Website: [jessepesse.github.io](https://jessepesse.github.io)

---

*Made with ❤️ and ☕ in Finland*

