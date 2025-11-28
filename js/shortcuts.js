/**
 * Shortcuts Module
 * Keyboard shortcuts handling
 */

import { getAppData } from './storage.js';

/**
 * Initialize keyboard shortcuts
 */
export function initShortcuts() {
    const searchInput = document.getElementById('search-input');

    // Listen for keydown events
    document.addEventListener('keydown', function (event) {
        // Disable shortcuts if edit mode is active
        if (document.body.classList.contains('editing')) {
            return;
        }

        // Disable shortcuts if the search input is focused
        if (document.activeElement === searchInput) {
            return;
        }

        // Check if the pressed key matches a dynamic shortcut
        const key = event.key.toUpperCase();
        const appData = getAppData();
        const shortcut = appData.shortcuts.find(s => s.key.toUpperCase() === key);
        if (shortcut) {
            event.preventDefault(); // Prevent default browser behavior
            window.open(shortcut.url, '_blank'); // Open the URL in a new tab
        }
    });
}
