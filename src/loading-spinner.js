'use strict';

const DEFAULT_ERROR_MESSAGE = 'Unable to load bounties. Please try again.';

function createLoadingState() {
  return {
    isLoading: false,
    error: null,
    bounties: [],
  };
}

async function loadBounties(fetchBounties, state = createLoadingState()) {
  if (typeof fetchBounties !== 'function') {
    throw new TypeError('fetchBounties must be a function');
  }

  state.isLoading = true;
  state.error = null;

  try {
    const bounties = await fetchBounties();
    state.bounties = Array.isArray(bounties) ? bounties : [];
    return state;
  } catch (error) {
    state.bounties = [];
    state.error = error && error.message ? error.message : DEFAULT_ERROR_MESSAGE;
    return state;
  } finally {
    state.isLoading = false;
  }
}

function renderBountyList(state) {
  if (state.isLoading) {
    return '<div class="loading-spinner" role="status" aria-live="polite"><span class="spinner" aria-hidden="true"></span>Loading bounties...</div>';
  }

  if (state.error) {
    return `<div class="error-state" role="alert">${escapeHtml(state.error)}</div>`;
  }

  if (!state.bounties.length) {
    return '<p class="empty-state">No bounties available.</p>';
  }

  const items = state.bounties
    .map((bounty) => `<li>${escapeHtml(String(bounty.title || bounty))}</li>`)
    .join('');

  return `<ul class="bounty-list">${items}</ul>`;
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[char]));
}

module.exports = {
  DEFAULT_ERROR_MESSAGE,
  createLoadingState,
  loadBounties,
  renderBountyList,
};
