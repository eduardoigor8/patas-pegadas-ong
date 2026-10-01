import { loadAppearancePreferences, saveAppearancePreferences } from './appearance-storage.js';

export function initializeAppearance() {
  const themeControl = document.getElementById('theme-choice');
  const contrastControl = document.getElementById('contrast-choice');

  if (!themeControl || !contrastControl) return;

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const systemContrast = window.matchMedia('(prefers-contrast: more)');
  const preferences = loadAppearancePreferences() || { theme: 'system', contrast: 'system' };

  const applyAppearance = () => {
    const theme = preferences.theme === 'system'
      ? (systemTheme.matches ? 'dark' : 'light')
      : preferences.theme;
    const contrast = preferences.contrast === 'system'
      ? (systemContrast.matches ? 'high' : 'normal')
      : preferences.contrast;

    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.contrast = contrast;
    themeControl.value = preferences.theme;
    contrastControl.value = preferences.contrast;
  };

  themeControl.addEventListener('change', () => {
    preferences.theme = themeControl.value;
    saveAppearancePreferences(preferences);
    applyAppearance();
  });

  contrastControl.addEventListener('change', () => {
    preferences.contrast = contrastControl.value;
    saveAppearancePreferences(preferences);
    applyAppearance();
  });

  systemTheme.addEventListener('change', () => {
    if (preferences.theme === 'system') applyAppearance();
  });

  systemContrast.addEventListener('change', () => {
    if (preferences.contrast === 'system') applyAppearance();
  });

  applyAppearance();
}