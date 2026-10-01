const appearanceStorageKey = 'patas-pegadas:appearance:v1';
const allowedThemes = ['system', 'light', 'dark'];
const allowedContrastModes = ['system', 'normal', 'high'];

export function loadAppearancePreferences() {
  try {
    const preferences = JSON.parse(localStorage.getItem(appearanceStorageKey) || 'null');

    if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) {
      return null;
    }

    return {
      theme: allowedThemes.includes(preferences.theme) ? preferences.theme : 'system',
      contrast: allowedContrastModes.includes(preferences.contrast) ? preferences.contrast : 'system',
    };
  } catch {
    return null;
  }
}

export function saveAppearancePreferences(preferences) {
  try {
    localStorage.setItem(appearanceStorageKey, JSON.stringify(preferences));
    return true;
  } catch {
    return false;
  }
}