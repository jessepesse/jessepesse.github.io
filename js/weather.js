/**
 * Weather Module
 * Weather widget functionality with Open-Meteo API
 */

import { escapeHtml } from './config.js';
import { getAppData, saveData } from './storage.js';

// Default location (Oulu)
const defaultLoc = { lat: 65.0124, lon: 25.4682 };

// ==========================================
// GEOCODING FUNCTIONS
// ==========================================

/**
 * Search for a city and update location
 * @param {string} query - City name to search
 * @param {Function} fetchWeather - Weather fetch callback
 */
export async function searchCity(query, fetchWeather) {
    if (!query || query.trim() === '') {
        alert('❌ Syötä kaupungin nimi');
        return;
    }

    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=fi&format=json`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Geocoding API error');
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert('❌ Kaupunkia ei löytynyt. Yritä uudestaan.');
            return;
        }

        const result = data.results[0];
        const appData = getAppData();

        // Update appData location
        appData.location = {
            lat: result.latitude,
            lon: result.longitude,
            name: result.name,
            country: result.country_code || result.country || 'N/A'
        };

        saveData();

        // Fetch weather for new location
        await fetchWeather(appData.location.lat, appData.location.lon);

        console.log('Sijainti päivitetty:', appData.location);

        // Clear input
        const cityInput = document.getElementById('city-input');
        if (cityInput) {
            cityInput.value = '';
        }

    } catch (error) {
        console.error('City search error:', error);
        alert('❌ Virhe haettaessa kaupunkia: ' + error.message);
    }
}

/**
 * Use GPS location with reverse geocoding
 * @param {Function} fetchWeather - Weather fetch callback
 */
export async function useGPSLocation(fetchWeather) {
    if (!navigator.geolocation) {
        alert('❌ Selaimesi ei tue paikannusta.');
        return;
    }

    const btnGps = document.getElementById('btn-gps');
    if (btnGps) {
        btnGps.style.opacity = '0.5';
    }

    navigator.geolocation.getCurrentPosition(
        async function (pos) {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const appData = getAppData();

            try {
                // Reverse geocoding: find nearest city from coordinates
                const url = `https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&count=1&language=fi&format=json`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Reverse geocoding failed');
                }

                const data = await response.json();

                // Update location with city name if found, otherwise use coordinates
                if (data.results && data.results.length > 0) {
                    const result = data.results[0];
                    appData.location = {
                        lat: lat,
                        lon: lon,
                        name: result.name,
                        country: result.country_code || result.country || 'N/A'
                    };
                } else {
                    // Fallback: use formatted coordinates
                    appData.location = {
                        lat: lat,
                        lon: lon,
                        name: `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`,
                        country: 'GPS'
                    };
                }

                saveData();
                await fetchWeather(appData.location.lat, appData.location.lon);

                console.log('GPS-sijainti päivitetty:', appData.location);

            } catch (error) {
                console.error('Reverse geocoding error:', error);
                // Fallback: save coordinates even if reverse geocoding fails
                appData.location = {
                    lat: lat,
                    lon: lon,
                    name: `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`,
                    country: 'GPS'
                };
                saveData();
                await fetchWeather(appData.location.lat, appData.location.lon);
            }

            if (btnGps) {
                btnGps.style.opacity = '1';
            }
        },
        function (error) {
            console.error('GPS error:', error);
            if (btnGps) {
                btnGps.style.opacity = '1';
            }
            alert('❌ GPS-sijaintia ei voitu hakea.');
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
}

// ==========================================
// WEATHER FUNCTIONS
// ==========================================

/**
 * Get saved location from app data
 * @returns {Object} Location object
 */
function getSavedLocation() {
    const appData = getAppData();
    if (appData.location && appData.location.lat && appData.location.lon) {
        return appData.location;
    }
    return defaultLoc;
}

/**
 * Update location display in weather widget
 */
export function updateLocationDisplay() {
    const locationDisplay = document.getElementById('location-display');
    const appData = getAppData();
    if (locationDisplay && appData.location) {
        const name = appData.location.name || 'GPS';
        const country = appData.location.country || 'LOC';
        locationDisplay.textContent = `${name}, ${country}`;
    }
}

/**
 * WMO Weather Code to Line Awesome icon mapping
 * @param {number} code - WMO weather code
 * @returns {string} Icon class
 */
function getWeatherIcon(code) {
    if (code === 0) return 'la-sun';
    if (code >= 1 && code <= 3) return 'la-cloud-sun';
    if (code === 45 || code === 48) return 'la-smog';
    if (code >= 51 && code <= 67) return 'la-cloud-rain';
    if (code >= 71 && code <= 77) return 'la-snowflake';
    if (code >= 80 && code <= 82) return 'la-tint';
    if (code >= 85 && code <= 86) return 'la-snowflake';
    if (code >= 95) return 'la-bolt';
    return 'la-cloud';
}

/**
 * Fetch weather data from Open-Meteo API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export async function fetchWeather(lat, lon) {
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&hourly=temperature_2m,weather_code,rain,showers,snowfall,precipitation_probability&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code&wind_speed_unit=ms';
    const weatherTextEl = document.getElementById('weather-text');
    const weatherForecastEl = document.getElementById('weather-forecast');
    const weatherCurrentEl = document.getElementById('weather-current');
    const weatherWidget = document.getElementById('weather-widget');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Weather fetch failed');

        const data = await response.json();
        const current = data.current;
        const hourly = data.hourly;

        // Extract and round values
        const temp = Math.round(current.temperature_2m);
        const feelsLike = Math.round(current.apparent_temperature);
        const windSpeed = Math.round(current.wind_speed_10m);
        const weatherCode = current.weather_code;

        // Update icon
        const iconEl = weatherCurrentEl ? weatherCurrentEl.querySelector('.weather-icon') : weatherWidget.querySelector('.weather-icon');
        if (iconEl) {
            iconEl.className = 'las ' + getWeatherIcon(weatherCode) + ' weather-icon';
        }

        // Format output: "X°C (Tuntuu kuin Y°) Tuulen nopeus on Z m/s"
        weatherTextEl.innerHTML =
            '<span class="weather-temp">' + escapeHtml(String(temp)) + '°C</span> ' +
            '<span class="weather-details">(Tuntuu kuin ' + escapeHtml(String(feelsLike)) + '°) Tuulen nopeus on ' + escapeHtml(String(windSpeed)) + ' m/s</span>';

        // ==========================================
        // FORECAST LOGIC (Next 6 hours)
        // ==========================================
        if (weatherForecastEl && hourly) {
            const currentHour = new Date().getHours();
            let maxProbability = 0;
            let totalRain = 0;
            let totalSnow = 0;

            // Loop through the next 6 hours
            for (let i = currentHour; i < currentHour + 6 && i < hourly.precipitation_probability.length; i++) {
                const prob = hourly.precipitation_probability[i] || 0;
                const rain = (hourly.rain[i] || 0) + (hourly.showers[i] || 0);
                const snow = hourly.snowfall[i] || 0;

                if (prob > maxProbability) {
                    maxProbability = prob;
                }
                totalRain += rain;
                totalSnow += snow;
            }

            // Determine precipitation type and display forecast
            if (maxProbability > 25) {
                const isSnow = totalSnow > totalRain;
                const emoji = isSnow ? '❄️' : '🌧️';
                const typeText = isSnow ? 'lumisadetta' : 'sateen uhka';
                weatherForecastEl.textContent = emoji + ' ' + maxProbability + '% ' + typeText + ' (seuraavat 6h)';
            } else {
                weatherForecastEl.textContent = '☁️ Poutaa (seuraavat 6h)';
            }
        }

    } catch (error) {
        console.error('Weather update error:', error);
        weatherTextEl.textContent = 'Sää ei saatavilla';
        if (weatherForecastEl) {
            weatherForecastEl.textContent = '';
        }
    }

    // Update location display
    updateLocationDisplay();
}

/**
 * Update weather with current saved location
 */
function updateWeather() {
    const loc = getSavedLocation();
    fetchWeather(loc.lat, loc.lon);
}

/**
 * Request geolocation and update weather
 */
function updateLocation() {
    if (!navigator.geolocation) {
        console.warn('Geolocation not supported');
        alert('Selaimesi ei tue paikannusta.');
        return;
    }

    const locationBtn = document.getElementById('location-btn');
    if (locationBtn) {
        locationBtn.classList.add('updating');
    }

    const appData = getAppData();
    navigator.geolocation.getCurrentPosition(
        function (pos) {
            const newLat = pos.coords.latitude;
            const newLon = pos.coords.longitude;

            // Update appData location
            appData.location = {
                lat: newLat,
                lon: newLon,
                name: 'GPS',
                country: 'LOC'
            };
            saveData();

            // Fetch weather with new location
            fetchWeather(newLat, newLon);

            if (locationBtn) {
                locationBtn.classList.remove('updating');
            }

            console.log('Sijainti päivitetty GPS:llä:', newLat, newLon);
        },
        function (error) {
            console.error('Geolocation error:', error);
            if (locationBtn) {
                locationBtn.classList.remove('updating');
            }

            // Fallback to default
            fetchWeather(defaultLoc.lat, defaultLoc.lon);
            alert('Sijaintia ei voitu hakea. Käytetään oletussijaintia (Oulu).');
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
}

/**
 * Initialize weather widget
 */
export function initWeather() {
    const weatherWidget = document.getElementById('weather-widget');
    const weatherTextEl = document.getElementById('weather-text');
    const locationBtn = document.getElementById('location-btn');

    // Location button click handler
    if (locationBtn) {
        locationBtn.addEventListener('click', updateLocation);
    }

    // Run on load and refresh every 30 minutes
    if (weatherWidget && weatherTextEl) {
        updateWeather();
        setInterval(updateWeather, 30 * 60 * 1000);
    }

    // Update location display
    updateLocationDisplay();
}
