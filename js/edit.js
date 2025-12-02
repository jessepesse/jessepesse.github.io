/**
 * Edit Module
 * Edit mode functionality for links, bangs, and shortcuts
 */

import { generateId, getIconForUrl, getNameFromUrl } from './config.js';
import { getAppData, saveData, exportConfig, importConfig, resetConfig } from './storage.js';
import { processSearchUrl } from './search.js';
import { initGroupDragDrop, initLinkDragDrop, enableDragDrop, disableDragDrop } from './dragdrop.js';

/**
 * Toggle edit mode on/off
 * @param {Function} renderHelp - Callback to re-render help
 */
export function toggleEditMode(renderHelp) {
    const EDIT_MODE_SLIDE_OUT_DELAY = 10;      // ms - Small delay to show slide-out animation
    const EDIT_MODE_CLEANUP_DELAY = 50;        // ms - Delay before cleaning up inline styles

    const wasEditing = document.body.classList.contains('editing');
    const helpBox = document.querySelector('.help-box');

    // If exiting edit mode, hide box first then remove class
    if (wasEditing) {
        // Disable drag and drop
        disableDragDrop();

        // Explicitly hide the help-box
        if (helpBox) {
            helpBox.style.transform = 'translateX(100%)';
            helpBox.style.pointerEvents = 'none';
        }

        // Wait a tiny bit for the slide-out, then update
        setTimeout(() => {
            document.body.classList.remove('editing');
            const editBtn = document.getElementById('edit-btn');
            if (editBtn) {
                editBtn.querySelector('i').className = 'las la-cog';
                editBtn.title = 'Muokkaa linkkejä';
                editBtn.setAttribute('aria-pressed', 'false');
            }
            renderHelp();

            // Clean up inline styles after rendering
            if (helpBox) {
                setTimeout(() => {
                    helpBox.style.transform = '';
                    helpBox.style.pointerEvents = '';
                }, EDIT_MODE_CLEANUP_DELAY);
            }
        }, EDIT_MODE_SLIDE_OUT_DELAY);
    } else {
        // Entering edit mode - toggle first, then render
        document.body.classList.add('editing');
        const editBtn = document.getElementById('edit-btn');
        if (editBtn) {
            editBtn.querySelector('i').className = 'las la-check';
            editBtn.title = 'Lopeta muokkaus';
            editBtn.setAttribute('aria-pressed', 'true');
        }
        renderHelp();

        // Enable drag and drop after render (so elements exist)
        setTimeout(() => {
            enableDragDrop(window._renderAppCallback);
        }, 50);
    }
}

/**
 * Attach edit mode event listeners
 * @param {Function} renderApp - Callback to re-render app
 */
export function attachEditListeners(renderApp) {
    const appData = getAppData();

    // Edit link buttons
    document.querySelectorAll('.link-edit-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const groupId = this.dataset.group;
            const linkIndex = parseInt(this.dataset.link, 10);
            editLink(groupId, linkIndex, renderApp);
        });
    });

    // Delete link buttons
    document.querySelectorAll('.link-delete-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const groupId = this.dataset.group;
            const linkIndex = parseInt(this.dataset.link, 10);
            deleteLink(groupId, linkIndex, renderApp);
        });
    });

    // Delete group buttons
    document.querySelectorAll('.card-delete-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const groupId = this.dataset.group;
            deleteGroup(groupId, renderApp);
        });
    });

    // Add link buttons
    document.querySelectorAll('.link-add-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const groupId = this.dataset.group;
            addLink(groupId, renderApp);
        });
    });
}

// ==========================================
// LINK MANAGEMENT
// ==========================================

function editLink(groupId, linkIndex, renderApp) {
    const appData = getAppData();
    const group = appData.groups.find(g => g.id === groupId);
    if (!group || !group.links[linkIndex]) return;

    const link = group.links[linkIndex];

    // Edit name
    const newName = prompt('Muokkaa nimeä:', link.name);
    if (newName === null) return; // User cancelled
    if (newName.trim()) {
        link.name = newName.trim();
    }

    // Edit URL
    const newUrl = prompt('Muokkaa osoitetta:', link.url);
    if (newUrl === null) return; // User cancelled
    if (newUrl.trim()) {
        let finalUrl = newUrl.trim();
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = 'https://' + finalUrl;
        }
        link.url = finalUrl;
    }

    // Edit icon (optional)
    const newIcon = prompt('Muokkaa ikonia (esim. "lab la-github"):', link.icon);
    if (newIcon === null) return; // User cancelled
    if (newIcon.trim()) {
        link.icon = newIcon.trim();
    }

    saveData();
    renderApp();
}

function deleteLink(groupId, linkIndex, renderApp) {
    const appData = getAppData();
    const group = appData.groups.find(g => g.id === groupId);
    if (group && confirm(`Poistetaanko "${group.links[linkIndex]?.name}"?`)) {
        group.links.splice(linkIndex, 1);
        saveData();
        renderApp();
    }
}

function addLink(groupId, renderApp) {
    const appData = getAppData();
    const url = prompt('Syötä URL (esim. https://example.com):');
    if (!url || !url.trim()) return;

    const trimmedUrl = url.trim();
    let finalUrl = trimmedUrl;
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
        finalUrl = 'https://' + trimmedUrl;
    }

    const autoName = getNameFromUrl(finalUrl);
    const name = prompt('Nimi (jätä tyhjäksi automaattiselle):', autoName) || autoName;
    const icon = getIconForUrl(finalUrl);

    const group = appData.groups.find(g => g.id === groupId);
    if (group) {
        group.links.push({ name, url: finalUrl, icon });
        saveData();
        renderApp();
    }
}

// ==========================================
// GROUP MANAGEMENT
// ==========================================

function deleteGroup(groupId, renderApp) {
    const appData = getAppData();
    const groupIndex = appData.groups.findIndex(g => g.id === groupId);
    if (groupIndex > -1 && confirm(`Poistetaanko ryhmä "${appData.groups[groupIndex].title}" ja kaikki sen linkit?`)) {
        appData.groups.splice(groupIndex, 1);
        saveData();
        renderApp();
    }
}

export function addGroup(renderApp) {
    const appData = getAppData();
    const title = prompt('Ryhmän nimi:');
    if (!title || !title.trim()) return;

    const newGroup = {
        id: generateId(),
        title: title.trim(),
        links: []
    };

    appData.groups.push(newGroup);
    saveData();
    renderApp();
}

// ==========================================
// HELP ITEM MANAGEMENT (Bangs & Shortcuts)
// ==========================================

export function editHelpItem(type, index, renderHelp) {
    const appData = getAppData();

    if (type === 'bang') {
        const bang = appData.bangs[index];
        if (!bang) return;

        // Edit trigger
        const newTrigger = prompt('Muokkaa komentoa (esim. "y!"):', bang.trigger);
        if (newTrigger === null) return; // User cancelled
        if (newTrigger.trim()) {
            // Validate trigger: only allow alphanumeric characters and !?- symbols
            if (!/^[a-zA-Z0-9!?-]+$/.test(newTrigger.trim())) {
                alert('Virhe: Komento saa sisältää vain kirjaimia, numeroita ja !?- merkkejä');
                return;
            }
            bang.trigger = newTrigger.trim();
        }

        // Edit name
        const newName = prompt('Muokkaa palvelun nimeä:', bang.name);
        if (newName === null) return; // User cancelled
        if (newName.trim()) {
            bang.name = newName.trim();
        }

        // Edit URL
        const urlInstruction = 'Muokkaa hakuosoitetta.\n\nHae sivustolla sanalla TEST ja liitä osoite tähän:';
        const newUrl = prompt(urlInstruction, bang.url.replace('%s', 'TEST'));
        if (newUrl === null) return; // User cancelled
        if (newUrl.trim()) {
            const processedUrl = processSearchUrl(newUrl.trim());
            if (processedUrl) {
                bang.url = processedUrl;
            }
        }
    } else {
        const shortcut = appData.shortcuts[index];
        if (!shortcut) return;

        // Edit key
        const newKey = prompt('Muokkaa näppäintä (esim. "W"):', shortcut.key);
        if (newKey === null) return; // User cancelled
        if (newKey.trim()) {
            shortcut.key = newKey.trim().toUpperCase();
        }

        // Edit name
        const newName = prompt('Muokkaa sivun nimeä:', shortcut.name);
        if (newName === null) return; // User cancelled
        if (newName.trim()) {
            shortcut.name = newName.trim();
        }

        // Edit URL
        const newUrl = prompt('Muokkaa osoitetta:', shortcut.url);
        if (newUrl === null) return; // User cancelled
        if (newUrl.trim()) {
            let finalUrl = newUrl.trim();
            if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
                finalUrl = 'https://' + finalUrl;
            }
            shortcut.url = finalUrl;
        }
    }

    saveData();
    renderHelp();
}

export function deleteHelpItem(type, index, renderHelp) {
    const appData = getAppData();
    const itemName = type === 'bang' ? appData.bangs[index].trigger : appData.shortcuts[index].key;
    if (confirm(`Poistetaanko "${itemName}"?`)) {
        if (type === 'bang') {
            appData.bangs.splice(index, 1);
        } else {
            appData.shortcuts.splice(index, 1);
        }
        saveData();
        renderHelp();
    }
}

export function addHelpItem(type, renderHelp) {
    const appData = getAppData();

    if (type === 'bang') {
        const trigger = prompt('Syötä komento (esim. "s!" Steamille):');
        if (!trigger || !trigger.trim()) return;

        // Validate trigger: only allow alphanumeric characters and !?- symbols
        if (!/^[a-zA-Z0-9!?-]+$/.test(trigger.trim())) {
            alert('Virhe: Komento saa sisältää vain kirjaimia, numeroita ja !?- merkkejä');
            return;
        }

        const name = prompt('Palvelun nimi (esim. "Steam"):');
        if (!name || !name.trim()) return;

        const urlInstruction = 'Hae sivustolla sanalla TEST, ja liitä osoite tähän:\n\n' +
            'Esim: https://store.steampowered.com/search/?term=TEST';
        const rawUrl = prompt(urlInstruction);
        if (!rawUrl || !rawUrl.trim()) return;

        // Smart URL processing
        const processedUrl = processSearchUrl(rawUrl.trim());
        if (!processedUrl) {
            alert('Virhe: Osoitteen pitää sisältää hakutermi "TEST".\n\nKokeile näin:\n1. Mene sivustolle\n2. Hae sanalla TEST\n3. Kopioi osoite selaimen osoitepalkista\n4. Liitä se tähän');
            return;
        }

        appData.bangs.push({ trigger: trigger.trim(), name: name.trim(), url: processedUrl });
    } else {
        const key = prompt('Näppäin (esim. "W"):');
        if (!key || !key.trim()) return;

        const name = prompt('Sivun nimi:');
        if (!name || !name.trim()) return;

        const url = prompt('URL:');
        if (!url || !url.trim()) return;

        appData.shortcuts.push({ key: key.trim().toUpperCase(), name: name.trim(), url: url.trim() });
    }

    saveData();
    renderHelp();
}

/**
 * Attach help listeners (settings, weather search, config management, help editing)
 * @param {Function} toggleEditMode - Callback to toggle edit mode
 * @param {Function} renderHelp - Callback to re-render help
 * @param {Function} searchCity - Weather city search callback
 * @param {Function} useGPSLocation - GPS location callback
 * @param {Function} renderApp - Callback to re-render app
 */
export function attachHelpListeners(toggleEditMode, renderHelp, searchCity, useGPSLocation, renderApp) {
    // Close button
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', () => {
            toggleEditMode(renderHelp);
        });
    }

    // Location search
    const cityInput = document.getElementById('city-input');
    const btnSearchCity = document.getElementById('btn-search-city');
    const btnGps = document.getElementById('btn-gps');

    if (btnSearchCity) {
        btnSearchCity.addEventListener('click', () => {
            searchCity(cityInput.value);
        });
    }
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchCity(cityInput.value);
            }
        });
    }
    if (btnGps) {
        btnGps.addEventListener('click', useGPSLocation);
    }

    // Config management
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (exportBtn) {
        exportBtn.addEventListener('click', exportConfig);
    }
    if (importBtn) {
        importBtn.addEventListener('click', () => importConfig(renderApp, renderHelp));
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Haluatko varmasti palauttaa oletusasetukset? Tämä poistaa kaikki nykyiset ryhmät, linkit ja asetukset.')) {
                resetConfig(renderApp, renderHelp);
            }
        });
    }

    // Edit buttons
    document.querySelectorAll('.help-edit-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const type = this.dataset.type;
            const index = parseInt(this.dataset.index, 10);
            editHelpItem(type, index, renderHelp);
        });
    });

    // Delete buttons
    document.querySelectorAll('.help-delete-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const type = this.dataset.type;
            const index = parseInt(this.dataset.index, 10);
            deleteHelpItem(type, index, renderHelp);
        });
    });

    // Add buttons
    document.querySelectorAll('.help-add-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const type = this.dataset.type;
            addHelpItem(type, renderHelp);
        });
    });
}

/**
 * Initialize edit mode toggle button and add group button
 * @param {Function} renderHelp - Callback to re-render help
 * @param {Function} renderApp - Callback to re-render app
 */
export function initEditMode(renderHelp, renderApp) {
    const editBtn = document.getElementById('edit-btn');
    const addGroupBtn = document.getElementById('add-group-btn');

    // Store renderApp callback globally for drag-drop
    window._renderAppCallback = renderApp;

    if (editBtn) {
        editBtn.addEventListener('click', () => toggleEditMode(renderHelp));
    }

    if (addGroupBtn) {
        addGroupBtn.addEventListener('click', () => addGroup(renderApp));
    }

    // Initialize drag and drop event listeners
    initGroupDragDrop(renderApp);
    initLinkDragDrop(renderApp);

    // Add Escape key listener to close edit mode
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('editing')) {
            toggleEditMode(renderHelp);
        }
    });
}
