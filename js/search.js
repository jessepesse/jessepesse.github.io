/**
 * Search Module
 * Search functionality and bang commands
 */

import { getAppData } from './storage.js';

/**
 * Process search URL with TEST placeholder
 * @param {string} url - raw URL with TEST
 * @returns {string|null} Processed URL with %s placeholder or null
 */
export function processSearchUrl(url) {
    // Check if URL already contains %s placeholder
    if (url.includes('%s')) {
        return url;
    }

    // Check if URL contains "TEST" (case-insensitive)
    const testRegex = /TEST/i;
    if (testRegex.test(url)) {
        // Replace TEST with %s (case-insensitive, first occurrence)
        return url.replace(testRegex, '%s');
    }

    // If neither %s nor TEST found, return null (validation failed)
    return null;
}

/**
 * Parse search input and determine appropriate URL
 * @param {string} input - User search input
 * @returns {Object} Object with url and query
 */
export function getSearchURL(input) {
    const appData = getAppData();

    // Check dynamic bangs from appData
    for (const bang of appData.bangs) {
        if (input.startsWith(bang.trigger)) {
            const query = input.slice(bang.trigger.length).trim();
            const url = bang.url.replace('%s', encodeURIComponent(query));
            return { url: url, query: query };
        }
    }

    // Default to Ecosia if no bang matches
    const defaultUrl = 'https://www.ecosia.org/search?q=' + encodeURIComponent(input);
    return { url: defaultUrl, query: input };
}

/**
 * Update form action dynamically
 * @param {string} url - Action URL
 */
function updateFormAction(url) {
    const form = document.querySelector('#search-form');
    form.action = url;
}

/**
 * Initialize search form
 */
export function initSearch() {
    // Event listener for the search form submission
    document.querySelector('#search-form').addEventListener('submit', function (event) {
        const input = document.querySelector('#search-input').value;
        const { url, query } = getSearchURL(input);
        updateFormAction(url);
        document.querySelector('#search-input').value = query; // Update the input field to exclude the prefix
    });
}
