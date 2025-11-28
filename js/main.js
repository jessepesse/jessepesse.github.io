/**
 * Main Module
 * Entry point and initialization coordinator
 */

import { WEEKDAYS_FI, MONTHS_FI, FOCUS_KEY } from './config.js';
import { loadData } from './storage.js';
import { renderApp, renderHelp } from './rendering.js';
import { initWeather, fetchWeather, searchCity, useGPSLocation } from './weather.js';
import { initSearch } from './search.js';
import { initShortcuts } from './shortcuts.js';
import { initEditMode, attachEditListeners, attachHelpListeners, toggleEditMode } from './edit.js';

// ==========================================
// DOM CONTENT LOADED
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const timeSpan = document.getElementById("time");
    const greetingSpan = document.getElementById("greeting");
    const dateSpan = document.getElementById("date");

    // ==========================================
    // INITIALIZATION
    // ==========================================

    loadData();

    // Create render wrapper functions that include callbacks
    const renderAppWithCallbacks = () => {
        renderApp(attachEditListeners.bind(null, renderAppWithCallbacks));
    };

    const renderHelpWithCallbacks = () => {
        renderHelp({
            attachHelpListeners: () => attachHelpListeners(
                () => toggleEditMode(renderHelpWithCallbacks),
                renderHelpWithCallbacks,
                (query) => searchCity(query, fetchWeather),
                () => useGPSLocation(fetchWeather),
                renderAppWithCallbacks
            )
        });
    };

    renderAppWithCallbacks();
    renderHelpWithCallbacks();
    initWeather();
    initSearch();
    initShortcuts();
    initEditMode(renderHelpWithCallbacks, renderAppWithCallbacks);

    // ==========================================
    // CLOCK AND DATE
    // ==========================================

    function padZero(num) {
        return num < 10 ? "0" + num : String(num);
    }

    function updateClock() {
        const d = new Date();

        // Update time
        const h_clock = padZero(d.getHours());
        const m = padZero(d.getMinutes());
        const s = padZero(d.getSeconds());
        if (timeSpan) {
            timeSpan.textContent = h_clock + ":" + m + ":" + s;
        }

        // Update greeting
        if (greetingSpan) {
            const h_greeting = d.getHours();
            let greetingText = "";
            if (h_greeting >= 5 && h_greeting < 12) {
                greetingText = "Huomenta";
            } else if (h_greeting >= 12 && h_greeting < 18) {
                greetingText = "Päivää";
            } else {
                greetingText = "Iltaa";
            }
            greetingSpan.textContent = greetingText;
        }

        // Update date
        if (dateSpan) {
            const dateText = WEEKDAYS_FI[d.getDay()] + " " + d.getDate() + ". " + MONTHS_FI[d.getMonth()] + " " + d.getFullYear();
            dateSpan.textContent = dateText;
        }
    }

    updateClock(); // Show time immediately on load

    const CLOCK_UPDATE_INTERVAL = 1000; // 1 second in milliseconds
    setInterval(updateClock, CLOCK_UPDATE_INTERVAL);

    // ==========================================
    // FOCUS MODE
    // ==========================================

    const focusBtn = document.getElementById('focus-btn');

    function setFocusMode(enabled) {
        if (enabled) {
            document.body.classList.add('focus-mode');
            if (focusBtn) {
                focusBtn.querySelector('i').className = 'las la-eye-slash';
                focusBtn.title = 'Exit Focus Mode';
                focusBtn.setAttribute('aria-pressed', 'true');
            }
        } else {
            document.body.classList.remove('focus-mode');
            if (focusBtn) {
                focusBtn.querySelector('i').className = 'las la-eye';
                focusBtn.title = 'Focus Mode';
                focusBtn.setAttribute('aria-pressed', 'false');
            }
        }
        localStorage.setItem(FOCUS_KEY, enabled ? 'true' : 'false');
    }

    function toggleFocusMode() {
        const isActive = document.body.classList.contains('focus-mode');
        setFocusMode(!isActive);
    }

    // Restore saved preference
    if (localStorage.getItem(FOCUS_KEY) === 'true') {
        setFocusMode(true);
    }

    // Button click handler
    if (focusBtn) {
        focusBtn.addEventListener('click', toggleFocusMode);
    }
});
