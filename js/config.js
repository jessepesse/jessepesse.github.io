/**
 * Configuration Module
 * Contains all constants, default configuration, and utility functions
 */

// ==========================================
// CONSTANTS
// ==========================================

export const STORAGE_KEY = 'startpage_config';
export const FOCUS_KEY = 'focus_mode';

// Finnish weekdays and months for date display
export const WEEKDAYS_FI = ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
export const MONTHS_FI = ["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta"];

// ==========================================
// DEFAULT CONFIGURATION
// ==========================================

export const DEFAULT_CONFIG = {
    groups: [
        {
            id: 'ajankulu',
            title: 'Ajankulu',
            links: [
                { name: 'Reddit', url: 'https://www.reddit.com/', icon: 'lab la-reddit' },
                { name: 'YouTube', url: 'https://www.youtube.com/', icon: 'lab la-youtube' },
                { name: 'Feedly', url: 'https://feedly.com/', icon: 'las la-rss' }
            ]
        },
        {
            id: 'uutiset',
            title: 'Uutiset',
            links: [
                { name: 'Ampparit', url: 'https://www.ampparit.com/', icon: 'las la-bolt' },
                { name: 'Ilta-Sanomat', url: 'https://www.is.fi/', icon: 'las la-newspaper' },
                { name: 'Iltalehti', url: 'https://www.iltalehti.fi/', icon: 'las la-fire' },
                { name: 'HS', url: 'https://www.hs.fi', icon: 'las la-city' },
                { name: 'Kaleva', url: 'https://www.kaleva.fi/', icon: 'las la-map-marker' },
                { name: 'Yle Uutiset', url: 'https://yle.fi/uutiset/', icon: 'las la-broadcast-tower' },
                { name: 'MTV Uutiset', url: 'https://mtvuutiset.fi', icon: 'las la-tv' }
            ]
        },
        {
            id: 'sahkopostit',
            title: 'Sähköpostit',
            links: [
                { name: 'Gmail', url: 'https://gmail.com', icon: 'lab la-google' },
                { name: 'Outlook', url: 'https://outlook.com', icon: 'lab la-microsoft' },
                { name: 'Tutanota', url: 'https://tutanota.com', icon: 'las la-user-shield' },
                { name: 'ProtonMail', url: 'https://proton.me/mail', icon: 'las la-user-shield' }
            ]
        },
        {
            id: 'muut',
            title: 'Muut',
            links: [
                { name: 'Github', url: 'https://github.com', icon: 'lab la-github' },
                { name: 'ChatGPT', url: 'https://chatgpt.com', icon: 'las la-robot' },
                { name: 'Gemini', url: 'https://gemini.google.com', icon: 'las la-gem' }
            ]
        }
    ],
    bangs: [
        { trigger: 'g!', name: 'Google', url: 'https://www.google.com/search?q=' },
        { trigger: 'y!', name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
        { trigger: 'gh!', name: 'GitHub', url: 'https://github.com/search?q=' }
    ],
    shortcuts: [
        { key: 'R', name: 'Reddit', url: 'https://www.reddit.com' },
        { key: 'Y', name: 'YouTube', url: 'https://www.youtube.com' },
        { key: 'G', name: 'Gmail', url: 'https://gmail.com' }
    ],
    location: {
        lat: 65.01,
        lon: 25.47,
        name: 'Oulu',
        country: 'FI'
    }
};

// ==========================================
// ICON MAPPING
// ==========================================

export const ICON_MAP = {
    'youtube': 'lab la-youtube',
    'reddit': 'lab la-reddit',
    'github': 'lab la-github',
    'twitter': 'lab la-twitter',
    'facebook': 'lab la-facebook',
    'instagram': 'lab la-instagram',
    'linkedin': 'lab la-linkedin',
    'gmail': 'lab la-google',
    'outlook': 'lab la-microsoft',
    'proton': 'las la-user-shield',
    'tutanota': 'las la-user-shield',
    'feedly': 'las la-rss',
    'chatgpt': 'las la-robot',
    'claude': 'las la-brain',
    'gemini': 'las la-gem',
    'localhost': 'las la-server',
    'ampparit': 'las la-bolt',
    'yle': 'las la-broadcast-tower',
    'mtv': 'las la-tv'
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Get appropriate icon for a URL based on ICON_MAP
 * @param {string} url - URL to get icon for
 * @returns {string} Icon class name
 */
export function getIconForUrl(url) {
    const lowerUrl = url.toLowerCase();
    for (const [key, icon] of Object.entries(ICON_MAP)) {
        if (lowerUrl.includes(key)) {
            return icon;
        }
    }
    return 'las la-globe';
}

/**
 * Extract and capitalize site name from URL
 * @param {string} url - URL to parse
 * @returns {string} Site name or 'Link' if parsing fails
 */
export function getNameFromUrl(url) {
    try {
        const hostname = new URL(url).hostname;
        const parts = hostname.replace('www.', '').split('.');
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    } catch (error) {
        console.error('Error parsing URL:', error);
        return 'Link';
    }
}

/**
 * Generate unique ID for groups
 * @returns {string} Unique ID
 */
export function generateId() {
    const ID_RADIX = 36;           // Base-36: numbers (0-9) and letters (a-z)
    const ID_PREFIX_SKIP = 2;      // Skip "0." prefix from Math.random()
    const ID_RANDOM_LENGTH = 9;    // Length of random string portion

    return 'group_' + Date.now() + '_' + Math.random().toString(ID_RADIX).substr(ID_PREFIX_SKIP, ID_RANDOM_LENGTH);
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
