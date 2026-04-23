/**
 * Search Module
 * Search functionality and bang commands
 */

import { CUSTOM_SEARCH_VALUE } from './config.js';
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

    // Default to user-selected search engine if no bang matches
    const defaultTemplate = appData.defaultSearchUrl === CUSTOM_SEARCH_VALUE
        ? (appData.customSearchUrl || 'https://www.ecosia.org/search?q=%s')
        : (appData.defaultSearchUrl || 'https://www.ecosia.org/search?q=%s');
    const defaultUrl = defaultTemplate.replace('%s', encodeURIComponent(input));
    return { url: defaultUrl, query: input };
}

/**
 * Initialize search form
 */
export function initSearch() {
    // Event listener for the search form submission
    document.querySelector('#search-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const input = document.querySelector('#search-input').value;
        const { url, query } = getSearchURL(input);
        document.querySelector('#search-input').value = query; // Update the input field to exclude the prefix

        window.open(url, '_blank', 'noopener,noreferrer');
    });
}
