/**
 * Drag and Drop Module
 * Handles drag-and-drop reordering for groups and links
 */

import { getAppData, saveData } from './storage.js';

// ==========================================
// STATE
// ==========================================

let draggedGroupElement = null;
let draggedLinkData = null; // { groupId, linkIndex }

// ==========================================
// GROUP DRAG & DROP
// ==========================================

/**
 * Initialize drag and drop for groups
 * @param {Function} renderApp - Callback to re-render app after reordering
 */
export function initGroupDragDrop(renderApp) {
    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) return;

    // Use event delegation for dynamic elements
    cardContainer.addEventListener('dragstart', handleGroupDragStart);
    cardContainer.addEventListener('dragend', handleGroupDragEnd);
    cardContainer.addEventListener('dragover', handleGroupDragOver);
    cardContainer.addEventListener('drop', handleGroupDrop);
    cardContainer.addEventListener('dragleave', handleGroupDragLeave);
}

/**
 * Handle drag start for groups
 */
function handleGroupDragStart(e) {
    if (!e.target || !e.target.closest) return;

    // Only handle if dragging a group column
    const groupCol = e.target.closest('[data-group-id]');
    if (!groupCol || !groupCol.hasAttribute('draggable')) return;

    draggedGroupElement = groupCol;
    groupCol.classList.add('dragging');

    // Set drag data (for compatibility)
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', groupCol.innerHTML);
}

/**
 * Handle drag end for groups
 */
function handleGroupDragEnd(e) {
    if (e.target && e.target.closest) {
        const groupCol = e.target.closest('[data-group-id]');
        if (groupCol) {
            groupCol.classList.remove('dragging');
        }
    }

    // Remove all drag-over classes
    document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });

    // CRITICAL: Clear group drag state
    draggedGroupElement = null;
}

/**
 * Handle drag over for groups
 */
function handleGroupDragOver(e) {
    // Ignore if we're dragging a link, not a group
    if (!draggedGroupElement || draggedLinkData) return;

    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = 'move';

    if (!e.target || !e.target.closest) return;

    const targetCol = e.target.closest('[data-group-id]');
    if (!targetCol || targetCol === draggedGroupElement) return;

    // Add visual feedback
    targetCol.classList.add('drag-over');
}

/**
 * Handle drag leave for groups
 */
function handleGroupDragLeave(e) {
    if (!e.target || !e.target.closest) return;

    const targetCol = e.target.closest('[data-group-id]');
    if (!targetCol) return;

    targetCol.classList.remove('drag-over');
}

/**
 * Handle drop for groups
 */
function handleGroupDrop(e) {
    // Ignore if we're dragging a link, not a group  
    if (!draggedGroupElement || draggedLinkData) return;

    e.preventDefault();
    e.stopPropagation();

    if (!e.target || !e.target.closest) return;

    const targetCol = e.target.closest('[data-group-id]');
    if (!targetCol || targetCol === draggedGroupElement) return;

    const draggedGroupId = draggedGroupElement.dataset.groupId;
    const targetGroupId = targetCol.dataset.groupId;

    // Reorder groups in appData
    const appData = getAppData();
    const draggedIndex = appData.groups.findIndex(g => g.id === draggedGroupId);
    const targetIndex = appData.groups.findIndex(g => g.id === targetGroupId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove from old position and insert at new position
    const [movedGroup] = appData.groups.splice(draggedIndex, 1);
    appData.groups.splice(targetIndex, 0, movedGroup);

    // Save and re-render
    saveData();

    // Re-render with current renderApp callback
    if (typeof window._renderAppCallback === 'function') {
        window._renderAppCallback();

        // Re-enable drag & drop after render
        setTimeout(() => {
            if (document.body.classList.contains('editing')) {
                enableDragDrop(window._renderAppCallback);
            }
        }, 50);
    }
}

// ==========================================
// LINK DRAG & DROP
// ==========================================

/**
 * Initialize drag and drop for links
 * @param {Function} renderApp - Callback to re-render app after reordering
 */
export function initLinkDragDrop(renderApp) {
    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) return;

    // Use event delegation for dynamic elements
    cardContainer.addEventListener('dragstart', handleLinkDragStart, true);
    cardContainer.addEventListener('dragend', handleLinkDragEnd, true);
    cardContainer.addEventListener('dragover', handleLinkDragOver, true);
    cardContainer.addEventListener('drop', handleLinkDrop, true);
}

/**
 * Handle drag start for links
 */
function handleLinkDragStart(e) {
    if (!e.target || !e.target.closest) return;

    // Only handle if dragging a link-row
    const linkRow = e.target.closest('.link-row');
    if (!linkRow || !linkRow.hasAttribute('draggable')) return;

    // Prevent group dragging when dragging a link
    e.stopPropagation();

    const groupCol = linkRow.closest('[data-group-id]');
    if (!groupCol) return;

    draggedLinkData = {
        groupId: groupCol.dataset.groupId,
        linkIndex: parseInt(linkRow.dataset.linkIndex, 10)
    };

    linkRow.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

/**
 * Handle drag end for links
 */
function handleLinkDragEnd(e) {
    if (e.target && e.target.closest) {
        const linkRow = e.target.closest('.link-row');
        if (linkRow) {
            linkRow.classList.remove('dragging');
        }
    }

    // Remove all drag-over classes
    document.querySelectorAll('.drag-over-link').forEach(el => {
        el.classList.remove('drag-over-link');
    });

    // CRITICAL: Clear link drag state
    draggedLinkData = null;
}

/**
 * Handle drag over for links
 */
function handleLinkDragOver(e) {
    // Ignore if we're dragging a group, not a link
    if (!draggedLinkData || draggedGroupElement) return;

    if (!e.target || !e.target.closest) return;

    const linkRow = e.target.closest('.link-row');
    const cardBody = e.target.closest('.card-body');

    // Check if we're in the same group
    if (cardBody) {
        const targetGroupCol = cardBody.closest('[data-group-id]');
        if (targetGroupCol && targetGroupCol.dataset.groupId !== draggedLinkData.groupId) {
            // Different group - don't allow drop
            return;
        }
    }

    if (linkRow || cardBody) {
        e.preventDefault(); // Allow drop
        e.stopPropagation(); // Prevent group drag over
        e.dataTransfer.dropEffect = 'move';

        if (linkRow) {
            linkRow.classList.add('drag-over-link');
        }
    }
}

/**
 * Handle drop for links
 */
function handleLinkDrop(e) {
    // Ignore if we're dragging a group, not a link
    if (!draggedLinkData || draggedGroupElement) return;

    if (!e.target || !e.target.closest) return;

    const targetLinkRow = e.target.closest('.link-row');
    const targetCardBody = e.target.closest('.card-body');

    if (!targetCardBody) return;

    e.preventDefault();
    e.stopPropagation(); // Prevent group drop

    const targetGroupCol = targetCardBody.closest('[data-group-id]');
    if (!targetGroupCol) return;

    const targetGroupId = targetGroupCol.dataset.groupId;
    const appData = getAppData();

    const sourceGroup = appData.groups.find(g => g.id === draggedLinkData.groupId);
    const targetGroup = appData.groups.find(g => g.id === targetGroupId);

    if (!sourceGroup || !targetGroup) return;

    // ONLY allow reordering within the same group
    if (sourceGroup.id !== targetGroup.id) {
        console.log('Cross-group link dragging is disabled');
        return; // Don't allow moving between groups
    }

    // Get the dragged link
    const draggedLink = sourceGroup.links[draggedLinkData.linkIndex];
    if (!draggedLink) return;

    // Determine target index
    let targetIndex = sourceGroup.links.length; // Default: end of list

    if (targetLinkRow) {
        targetIndex = parseInt(targetLinkRow.dataset.linkIndex, 10);
    }

    // Same group reordering
    const currentIndex = draggedLinkData.linkIndex;

    // Don't do anything if dropping on itself
    if (currentIndex === targetIndex) return;

    // Remove from current position
    sourceGroup.links.splice(currentIndex, 1);

    // Adjust target index if moving down
    if (targetIndex > currentIndex) {
        targetIndex--;
    }

    // Insert at new position
    sourceGroup.links.splice(targetIndex, 0, draggedLink);

    // Save and re-render
    saveData();

    if (typeof window._renderAppCallback === 'function') {
        window._renderAppCallback();

        // Re-enable drag & drop after render
        setTimeout(() => {
            if (document.body.classList.contains('editing')) {
                enableDragDrop(window._renderAppCallback);
            }
        }, 50);
    }

    console.log('Link reordered within', sourceGroup.title);
}

/**
 * Enable drag and drop (called when entering edit mode)
 * @param {Function} renderApp - Render callback
 */
export function enableDragDrop(renderApp) {
    // Store render callback globally for drop handlers
    window._renderAppCallback = renderApp;

    // Make groups draggable
    const groups = document.querySelectorAll('[data-group-id]');
    groups.forEach(col => {
        col.setAttribute('draggable', 'true');
    });
    // Make links draggable
    const links = document.querySelectorAll('.link-row');
    links.forEach(row => {
        row.setAttribute('draggable', 'true');
    });
}

/**
 * Disable drag and drop (called when exiting edit mode)
 */
export function disableDragDrop() {
    // Remove draggable from groups
    document.querySelectorAll('[data-group-id]').forEach(col => {
        col.removeAttribute('draggable');
    });

    // Remove draggable from links
    document.querySelectorAll('.link-row').forEach(row => {
        row.removeAttribute('draggable');
    });

    // Clear callback
    window._renderAppCallback = null;
}
