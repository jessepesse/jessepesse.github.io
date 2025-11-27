document.addEventListener('DOMContentLoaded', function () {
  var timeSpan = document.getElementById("time");
  var greetingSpan = document.getElementById("greeting");
  var dateSpan = document.getElementById("date");
  const searchInput = document.getElementById('search-input');

  // Määritellään vakiot päivitysfunktion ulkopuolella tehokkuuden vuoksi
  const weekdays_fi = ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
  const months_fi = ["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta"];

  // ==========================================
  // DYNAMIC LINKS CONFIGURATION
  // ==========================================
  const STORAGE_KEY = 'startpage_config';

  const DEFAULT_CONFIG = {
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

  // Icon mapping for auto-detection
  const ICON_MAP = {
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

  function getIconForUrl(url) {
    const lowerUrl = url.toLowerCase();
    for (const [key, icon] of Object.entries(ICON_MAP)) {
      if (lowerUrl.includes(key)) {
        return icon;
      }
    }
    return 'las la-globe';
  }

  function getNameFromUrl(url) {
    try {
      const hostname = new URL(url).hostname;
      const parts = hostname.replace('www.', '').split('.');
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    } catch {
      return 'Link';
    }
  }

  function generateId() {
    return 'group_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==========================================
  // DATA MANAGEMENT
  // ==========================================
  let appData = {
    groups: [],
    bangs: [],
    shortcuts: []
  };

  function loadData() {
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
      } catch {
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

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  }

  function resetToDefault() {
    if (confirm('Haluatko palauttaa oletusasetukset? Kaikki muutokset menetetään.')) {
      appData = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      saveData();
      renderApp();
      renderHelp();
    }
  }

  // ==========================================
  // RENDERING ENGINE
  // ==========================================
  const cardContainer = document.getElementById('card-container');

  function renderApp() {
    if (!cardContainer) return;

    cardContainer.innerHTML = '';

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

    // Attach event listeners
    attachEditListeners();
  }

  // ==========================================
  // HELP MODULE RENDERING
  // ==========================================
  const helpBox = document.querySelector('.help-box');

  function renderHelp() {
    if (!helpBox) return;

    const isEditing = document.body.classList.contains('editing');

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

    // Attach help event listeners
    attachHelpListeners();
  }

  function attachHelpListeners() {
    // Close button
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    if (sidebarCloseBtn) {
      sidebarCloseBtn.addEventListener('click', () => {
        toggleEditMode();
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
      importBtn.addEventListener('click', importConfig);
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Haluatko varmasti palauttaa oletusasetukset? Tämä poistaa kaikki nykyiset ryhmät, linkit ja asetukset.')) {
          resetConfig();
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
        editHelpItem(type, index);
      });
    });

    // Delete buttons
    document.querySelectorAll('.help-delete-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const type = this.dataset.type;
        const index = parseInt(this.dataset.index, 10);
        deleteHelpItem(type, index);
      });
    });

    // Add buttons
    document.querySelectorAll('.help-add-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const type = this.dataset.type;
        addHelpItem(type);
      });
    });
  }

  function editHelpItem(type, index) {
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

  function deleteHelpItem(type, index) {
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

  function addHelpItem(type) {
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

  function processSearchUrl(url) {
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

  // ==========================================
  // EDIT MODE & EVENT HANDLERS
  // ==========================================
  const editBtn = document.getElementById('edit-btn');
  const addGroupBtn = document.getElementById('add-group-btn');

  function toggleEditMode() {
    document.body.classList.toggle('editing');
    if (editBtn) {
      const isEditing = document.body.classList.contains('editing');
      editBtn.querySelector('i').className = isEditing ? 'las la-check' : 'las la-cog';
      editBtn.title = isEditing ? 'Lopeta muokkaus' : 'Muokkaa linkkejä';
    }
    // Re-render help to show/hide edit buttons
    renderHelp();
  }

  function attachEditListeners() {
    // Edit link buttons
    document.querySelectorAll('.link-edit-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const groupId = this.dataset.group;
        const linkIndex = parseInt(this.dataset.link, 10);
        editLink(groupId, linkIndex);
      });
    });

    // Delete link buttons
    document.querySelectorAll('.link-delete-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const groupId = this.dataset.group;
        const linkIndex = parseInt(this.dataset.link, 10);
        deleteLink(groupId, linkIndex);
      });
    });

    // Delete group buttons
    document.querySelectorAll('.card-delete-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const groupId = this.dataset.group;
        deleteGroup(groupId);
      });
    });

    // Add link buttons
    document.querySelectorAll('.link-add-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const groupId = this.dataset.group;
        addLink(groupId);
      });
    });
  }

  function editLink(groupId, linkIndex) {
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

  function deleteLink(groupId, linkIndex) {
    const group = appData.groups.find(g => g.id === groupId);
    if (group && confirm(`Poistetaanko "${group.links[linkIndex]?.name}"?`)) {
      group.links.splice(linkIndex, 1);
      saveData();
      renderApp();
    }
  }

  function deleteGroup(groupId) {
    const groupIndex = appData.groups.findIndex(g => g.id === groupId);
    if (groupIndex > -1 && confirm(`Poistetaanko ryhmä "${appData.groups[groupIndex].title}" ja kaikki sen linkit?`)) {
      appData.groups.splice(groupIndex, 1);
      saveData();
      renderApp();
    }
  }

  function addLink(groupId) {
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

  function addGroup() {
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

  // Event listeners for edit mode
  if (editBtn) {
    editBtn.addEventListener('click', toggleEditMode);
  }

  if (addGroupBtn) {
    addGroupBtn.addEventListener('click', addGroup);
  }

  // ==========================================
  // CONFIG MANAGEMENT: IMPORT/EXPORT/RESET
  // ==========================================

  function exportConfig() {
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
      alert('❌ Virhe kopioitaessa: ' + err.message);
    }
  }

  function importConfig() {
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
      alert('❌ Virhe tuotaessa asetuksia:\n' + err.message);
    }
  }

  function resetConfig() {
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

  // ==========================================
  // LOCATION SEARCH (GEOCODING)
  // ==========================================

  async function searchCity(query) {
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

  async function useGPSLocation() {
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
  // INITIALIZATION
  // ==========================================
  loadData();
  renderApp();
  renderHelp();
  updateLocationDisplay();

  function padZero(num) {
    return num < 10 ? "0" + num : String(num);
  }

  function updateClock() {
    var d = new Date();

    // Kellonajan päivitys
    var h_clock = padZero(d.getHours());
    var m = padZero(d.getMinutes());
    var s = padZero(d.getSeconds());
    if (timeSpan) {
      timeSpan.textContent = h_clock + ":" + m + ":" + s;
    }

    // Tervehdyksen päivitys
    if (greetingSpan) {
      var h_greeting = d.getHours();
      var greetingText = "";
      if (h_greeting >= 5 && h_greeting < 12) {
        greetingText = "Huomenta";
      } else if (h_greeting >= 12 && h_greeting < 18) {
        greetingText = "Päivää";
      } else {
        greetingText = "Iltaa";
      }
      greetingSpan.textContent = greetingText;
    }

    // Päivämäärän päivitys
    if (dateSpan) {
      var dateText = weekdays_fi[d.getDay()] + " " + d.getDate() + ". " + months_fi[d.getMonth()] + " " + d.getFullYear();
      dateSpan.textContent = dateText;
    }
  }

  updateClock(); // Näytä aika heti latauksessa
  setInterval(updateClock, 1000);

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
    const shortcut = appData.shortcuts.find(s => s.key.toUpperCase() === key);
    if (shortcut) {
      event.preventDefault(); // Prevent default browser behavior
      window.open(shortcut.url, '_blank'); // Open the URL in a new tab
    }
  });

  // Function to parse the search input and determine the appropriate URL
  function getSearchURL(input) {
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

  // Function to update the form action dynamically
  function updateFormAction(url) {
    const form = document.querySelector('#search-form');
    form.action = url;
  }

  // Event listener for the search form submission
  document.querySelector('#search-form').addEventListener('submit', function (event) {
    const input = document.querySelector('#search-input').value;
    const { url, query } = getSearchURL(input);
    updateFormAction(url);
    document.querySelector('#search-input').value = query; // Update the input field to exclude the prefix
  });

  // ==========================================
  // WEATHER WIDGET (Open-Meteo API)
  // ==========================================
  const weatherTextEl = document.getElementById('weather-text');
  const weatherWidget = document.getElementById('weather-widget');
  const weatherForecastEl = document.getElementById('weather-forecast');
  const weatherCurrentEl = document.getElementById('weather-current');
  const locationBtn = document.getElementById('location-btn');

  // Default location (Oulu)
  const defaultLoc = { lat: 65.0124, lon: 25.4682 };

  // Get saved location from appData
  function getSavedLocation() {
    if (appData.location && appData.location.lat && appData.location.lon) {
      return appData.location;
    }
    return defaultLoc;
  }

  // Update location display in weather widget
  function updateLocationDisplay() {
    const locationDisplay = document.getElementById('location-display');
    if (locationDisplay && appData.location) {
      const name = appData.location.name || 'GPS';
      const country = appData.location.country || 'LOC';
      locationDisplay.textContent = `${name}, ${country}`;
    }
  }

  // WMO Weather Code to Line Awesome icon mapping
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

  async function fetchWeather(lat, lon) {
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&hourly=temperature_2m,weather_code,rain,showers,snowfall,precipitation_probability&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code&wind_speed_unit=ms';

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

  // Update weather with current saved location
  function updateWeather() {
    const loc = getSavedLocation();
    fetchWeather(loc.lat, loc.lon);
  }

  // Request geolocation and update weather
  function updateLocation() {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      alert('Selaimesi ei tue paikannusta.');
      return;
    }

    if (locationBtn) {
      locationBtn.classList.add('updating');
    }

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

  // Location button click handler
  if (locationBtn) {
    locationBtn.addEventListener('click', updateLocation);
  }

  // Run on load and refresh every 30 minutes
  if (weatherWidget && weatherTextEl) {
    updateWeather();
    setInterval(updateWeather, 30 * 60 * 1000);
  }

  // ==========================================
  // FOCUS MODE
  // ==========================================
  const focusBtn = document.getElementById('focus-btn');
  const FOCUS_KEY = 'focus_mode';

  function setFocusMode(enabled) {
    if (enabled) {
      document.body.classList.add('focus-mode');
      if (focusBtn) {
        focusBtn.querySelector('i').className = 'las la-eye-slash';
        focusBtn.title = 'Exit Focus Mode';
      }
    } else {
      document.body.classList.remove('focus-mode');
      if (focusBtn) {
        focusBtn.querySelector('i').className = 'las la-eye';
        focusBtn.title = 'Focus Mode';
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
