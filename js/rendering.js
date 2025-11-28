/**
 * Rendering Module
 * DOM manipulation and rendering logic
 */

import { escapeHtml } from './config.js';
import { getAppData } from './storage.js';

// ==========================================
// PUBLIC API
// ==========================================

/**
 * Render link cards
 * @param {Function} attachEditListeners - Callback to attach edit mode listeners
 */
export function renderApp(attachEditListeners) {
    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) return;

    cardContainer.innerHTML = '';
    const appData = getAppData();

    appData.groups.forEach((group) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-3 mb-3';
        col.dataset.groupId = group.id;

        const linksHtml = group.links.map((link, linkIndex) => `
      <div class="link-row" data-link-index="${linkIndex}">
        <a class="text-a d-block" href="${escapeHtml(link.url)}" target="_blank">
          <i class="${escapeHtml(link.icon)} pr-2"></i>${escapeHtml(link.name)}
        </a>
        <button class="link-edit-btn" data-group="${group.id}" data-link="${linkIndex}" aria-label="Muokkaa linkki">
          <i class="las la-pen"></i>
        </button>
        <button class="link-delete-btn" data-group="${group.id}" data-link="${linkIndex}" aria-label="Poista linkki">
          <i class="las la-times"></i>
        </button>
      </div>
    `).join('');

        const cardClass = 'card glass h-100';

        col.innerHTML = `
      <div class="${cardClass}">
        <button class="card-delete-btn" data-group="${group.id}" aria-label="Poista ryhmä">
          <i class="las la-times"></i>
        </button>
        <div class="card-body">
          <div class="square-header">${escapeHtml(group.title)}</div>
          ${linksHtml}
          <button class="link-add-btn" data-group="${group.id}" aria-label="Lisää linkki">
            <i class="las la-plus"></i> Lisää linkki
          </button>
        </div>
      </div>
    `;

        cardContainer.appendChild(col);
    });

    // Attach event listeners if callback provided
    if (attachEditListeners) {
        attachEditListeners();
    }
}

/**
 * Render help sidebar
 * @param {Object} callbacks - Event handler callbacks
 */
export function renderHelp(callbacks = {}) {
    const helpBox = document.querySelector('.help-box');
    if (!helpBox) return;

    const isEditing = document.body.classList.contains('editing');
    const appData = getAppData();

    const bangsHtml = appData.bangs.map((bang, index) => `
    <li>
      <code>${escapeHtml(bang.trigger)}</code> — ${escapeHtml(bang.name)}
      ${isEditing ? `<button class="help-edit-btn" data-type="bang" data-index="${index}" aria-label="Muokkaa">
        <i class="las la-pen"></i>
      </button>` : ''}
      ${isEditing ? `<button class="help-delete-btn" data-type="bang" data-index="${index}" aria-label="Poista">
        <i class="las la-times"></i>
      </button>` : ''}
    </li>
  `).join('');

    const shortcutsHtml = appData.shortcuts.map((shortcut, index) => `
    <li>
      <code>${escapeHtml(shortcut.key)}</code> — ${escapeHtml(shortcut.name)}
      ${isEditing ? `<button class="help-edit-btn" data-type="shortcut" data-index="${index}" aria-label="Muokkaa">
        <i class="las la-pen"></i>
      </button>` : ''}
      ${isEditing ? `<button class="help-delete-btn" data-type="shortcut" data-index="${index}" aria-label="Poista">
        <i class="las la-times"></i>
      </button>` : ''}
    </li>
  `).join('');

    helpBox.innerHTML = `
    ${isEditing ? `<button id="sidebar-close-btn" class="sidebar-close-btn" aria-label="Sulje sivupalkki">
      <i class="las la-times"></i>
    </button>` : ''}
    
    ${isEditing ? `<div class="sidebar-settings-section">
      <div class="setting-group">
        <label class="setting-label">Sijainti</label>
        <div class="input-group-sidebar">
          <input type="text" id="city-input" class="sidebar-input" placeholder="Syötä kaupunki...">
          <button id="btn-search-city" class="sidebar-btn" aria-label="Hae kaupunki">
            <i class="las la-search"></i>
          </button>
          <button id="btn-gps" class="sidebar-btn" aria-label="Käytä GPS-sijaintia">
            <i class="las la-map-marker"></i>
          </button>
        </div>
      </div>
      <hr class="sidebar-divider">
      <div class="setting-group">
        <label class="setting-label">Tietojen hallinta</label>
        <button id="export-btn" class="sidebar-action-btn">
          <i class="las la-download"></i> Vie asetukset
        </button>
        <button id="import-btn" class="sidebar-action-btn">
          <i class="las la-upload"></i> Tuo asetukset
        </button>
        <button id="reset-btn" class="sidebar-action-btn">
          <i class="las la-redo-alt"></i> Palauta oletukset
        </button>
      </div>
      <hr class="sidebar-divider">
    </div>` : ''}
    
    <div class="help-section">
      <h4 class="help-header">Hakukomennot</h4>
      <ul class="help-list">
        ${bangsHtml}
      </ul>
      ${isEditing ? `<button class="help-add-btn" data-type="bang" aria-label="Lisää bang">
        <i class="las la-plus"></i> Lisää komento
      </button>` : ''}
    </div>
    <hr class="help-divider">
    <div class="help-section">
      <h4 class="help-header">Näppäinoikotiet</h4>
      <ul class="help-list">
        ${shortcutsHtml}
      </ul>
      ${isEditing ? `<button class="help-add-btn" data-type="shortcut" aria-label="Lisää oikotie">
        <i class="las la-plus"></i> Lisää oikotie
      </button>` : ''}
    </div>
  `;

    // Attach help event listeners if callback provided
    if (callbacks.attachHelpListeners) {
        callbacks.attachHelpListeners();
    }
}
