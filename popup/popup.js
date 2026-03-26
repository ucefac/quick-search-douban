/**
 * Popup Settings Page Logic
 */

const DEFAULT_SEARCH_URL = 'https://www.douban.com/search?q=';

document.addEventListener('DOMContentLoaded', async () => {
  const enabledCheckbox = document.getElementById('enabled');
  const searchUrlInput = document.getElementById('searchUrl');
  const statusDiv = document.getElementById('status');

  // Load saved settings
  const settings = await loadSettings();
  enabledCheckbox.checked = settings.enabled;
  searchUrlInput.value = settings.searchUrl;

  // Save settings on change
  enabledCheckbox.addEventListener('change', async () => {
    await saveSettings({
      enabled: enabledCheckbox.checked,
      searchUrl: searchUrlInput.value
    });
    showStatus('设置已保存');
  });

  searchUrlInput.addEventListener('change', async () => {
    await saveSettings({
      enabled: enabledCheckbox.checked,
      searchUrl: searchUrlInput.value
    });
    showStatus('设置已保存');
  });

  // Show status message
  function showStatus(message) {
    statusDiv.textContent = message;
    statusDiv.classList.add('visible');
    setTimeout(() => {
      statusDiv.classList.remove('visible');
    }, 2000);
  }
});

/**
 * Load settings from chrome.storage
 * @returns {Promise<{enabled: boolean, searchUrl: string}>}
 */
async function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({
      enabled: true,
      searchUrl: DEFAULT_SEARCH_URL
    }, (items) => {
      resolve(items);
    });
  });
}

/**
 * Save settings to chrome.storage
 * @param {{enabled: boolean, searchUrl: string}} settings
 */
async function saveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(settings, () => {
      resolve();
      // Notify background script about settings change
      chrome.runtime.sendMessage({
        type: 'SETTINGS_UPDATED',
        settings: settings
      }, () => {
        // Ignore errors
      });
    });
  });
}
