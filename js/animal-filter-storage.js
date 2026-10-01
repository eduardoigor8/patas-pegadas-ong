const filterStorageKey = 'patas-pegadas:animal-filters:v1';

export function loadAnimalFilters() {
  try {
    const savedFilters = JSON.parse(localStorage.getItem(filterStorageKey) || 'null');
    return savedFilters && typeof savedFilters === 'object' && !Array.isArray(savedFilters)
      ? savedFilters
      : null;
  } catch {
    return null;
  }
}

export function saveAnimalFilters(filters) {
  try {
    localStorage.setItem(filterStorageKey, JSON.stringify(filters));
  } catch {
    return false;
  }

  return true;
}