/**
 * Storage Module
 * Handles all localStorage operations and data management
 */

import { DEFAULT_CONFIG, STORAGE_KEY } from './config.js';

// ==========================================
// STATE
// ==========================================

let appData = {
    groups: [],
    bangs: [],
    shortcuts: [],
    location: {}
};

// ==========================================
// PUBLIC API
// ==========================================

/**
 * Load data from localStorage
 * Handles backward compatibility and migration
 */
export function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Ensure backward compatibility - convert old array format to new object format
            if (Array.isArray(parsed)) {
                appData = {
                    groups: parsed,
                    bangs: DEFAULT_CONFIG.bangs,
                    shortcuts: DEFAULT_CONFIG.shortcuts,
                    location: DEFAULT_CONFIG.location
                };
                saveData(); // Migrate to new format
            } else {
                appData = parsed;
                // Ensure location exists
                if (!appData.location) {
                    appData.location = DEFAULT_CONFIG.location;
                }
            }
        } catch (error) {
            console.error('Failed to parse saved config:', error);
            appData = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        }
    } else {
        appData = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    }

    // Migrate old user_location from localStorage if it exists
    const oldLocation = localStorage.getItem('user_location');
    if (oldLocation && !saved) {
        try {
            const oldLoc = JSON.parse(oldLocation);
            if (oldLoc.lat && oldLoc.lon) {
                appData.location = {
                    lat: oldLoc.lat,
                    lon: oldLoc.lon,
                    name: 'GPS',
                    country: 'LOC'
                };
                saveData();
                localStorage.removeItem('user_location'); // Clean up old format
            }
        } catch (e) {
            console.warn('Could not migrate old location data');
        }
    }
}

/**
 * Save data to localStorage
 */
export function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

/**
 * Get current app data
 * @returns {Object} Current appData
 */
export function getAppData() {
    return appData;
}

/**
 * Update app data
 * @param {Object} newData - New data to set
 */
export function setAppData(newData) {
    appData = newData;
    saveData();
}

/**
 * Export configuration to clipboard
 */
export function exportConfig() {
    try {
        const json = JSON.stringify(appData, null, 2);
        navigator.clipboard.writeText(json).then(() => {
            alert('✅ Asetukset kopioitu leikepöydälle!');
        }).catch(err => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = json;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('✅ Asetukset kopioitu leikepöydälle!');
        });
    } catch (err) {
        console.error('Export config error:', err);
        alert('❌ Virhe kopioitaessa: ' + err.message);
    }
}

/**
 * Import configuration from JSON
 * @param {Function} renderApp - Callback to re-render app
 * @param {Function} renderHelp - Callback to re-render help
 */
export function importConfig(renderApp, renderHelp) {
    const input = prompt('Liitä asetukset (JSON) tähän:');
    if (!input) return; // User cancelled

    try {
        const parsed = JSON.parse(input);

        // Validate structure
        if (!parsed || typeof parsed !== 'object') {
            throw new Error('Virheellinen JSON-muoto');
        }

        // Check for required structure (groups array)
        if (!parsed.groups || !Array.isArray(parsed.groups)) {
            throw new Error('Asetuksista puuttuu "groups"-taulukko');
        }

        // Optional: validate bangs and shortcuts
        if (parsed.bangs && !Array.isArray(parsed.bangs)) {
            throw new Error('Virheellinen "bangs"-rakenne');
        }
        if (parsed.shortcuts && !Array.isArray(parsed.shortcuts)) {
            throw new Error('Virheellinen "shortcuts"-rakenne');
        }

        // Update appData
        appData = parsed;
        saveData();
        renderApp();
        renderHelp();

        alert('✅ Asetukset tuotu onnistuneesti!');
    } catch (err) {
        console.error('Import config error:', err);
        alert('❌ Virhe tuotaessa asetuksia:\n' + err.message);
    }
}

/**
 * Reset configuration to defaults
 * @param {Function} renderApp - Callback to re-render app
 * @param {Function} renderHelp - Callback to re-render help
 */
export function resetConfig(renderApp, renderHelp) {
    const confirmed = confirm(
        '⚠️ Haluatko varmasti nollata kaikki asetukset ja palauttaa oletukset?\n\n' +
        'Tämä poistaa:\n' +
        '• Kaikki linkkikortit\n' +
        '• Kaikki hakuprefixit (bangs)\n' +
        '• Kaikki näppäinoikotiet\n\n' +
        'Toimintoa ei voi perua!'
    );

    if (confirmed) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('focus_mode');
        alert('✅ Asetukset nollattu. Sivu ladataan uudelleen.');
        location.reload();
    }
}
