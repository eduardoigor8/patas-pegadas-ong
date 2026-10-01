import { loadAnimalFilters, saveAnimalFilters } from './animal-filter-storage.js';

export function initializeAnimalFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.pet-card');
  const tipoAnimal = document.getElementById('tipoAnimal');
  const idadeAnimal = document.getElementById('idadeAnimal');
  const porteAnimal = document.getElementById('porteAnimal');
  const cidadeAnimal = document.getElementById('cidadeAnimal');
  const buscarAnimal = document.getElementById('buscarAnimal');

  if (!filters.length || !cards.length) return;

  const savedFilters = loadAnimalFilters();

  if (savedFilters) {
    const savedQuickFilter = Array.from(filters).find((button) => button.dataset.filter === savedFilters.quickFilter);
    if (savedQuickFilter) {
      filters.forEach((button) => button.classList.toggle('active', button === savedQuickFilter));
    }

    const restoreSelect = (select, value) => {
      if (select && typeof value === 'string'
        && Array.from(select.options).some((option) => option.value === value)) {
        select.value = value;
      }
    };

    restoreSelect(tipoAnimal, savedFilters.type);
    restoreSelect(idadeAnimal, savedFilters.age);
    restoreSelect(porteAnimal, savedFilters.size);
    restoreSelect(cidadeAnimal, savedFilters.city);

    if (buscarAnimal && typeof savedFilters.search === 'string') {
      buscarAnimal.value = savedFilters.search;
    }
  }

  const saveFilters = () => {
    const activeQuickFilter = document.querySelector('.filter-btn.active');

    saveAnimalFilters({
      quickFilter: activeQuickFilter ? activeQuickFilter.dataset.filter : 'all',
      type: tipoAnimal ? tipoAnimal.value : 'all',
      age: idadeAnimal ? idadeAnimal.value : 'all',
      size: porteAnimal ? porteAnimal.value : 'all',
      city: cidadeAnimal ? cidadeAnimal.value : 'all',
      search: buscarAnimal ? buscarAnimal.value : '',
    });
  };

  const applyFilters = () => {
    const activeQuick = document.querySelector('.filter-btn.active');
    const quickValue = activeQuick ? activeQuick.dataset.filter : 'all';
    const typeValue = tipoAnimal ? tipoAnimal.value : 'all';
    const ageValue = idadeAnimal ? idadeAnimal.value : 'all';
    const sizeValue = porteAnimal ? porteAnimal.value : 'all';
    const cityValue = cidadeAnimal ? cidadeAnimal.value : 'all';
    const searchValue = buscarAnimal ? buscarAnimal.value.trim().toLowerCase() : '';

    cards.forEach((card) => {
      const matchesQuick = quickValue === 'all' || card.dataset.tipo === quickValue || card.dataset.idade === quickValue;
      const matchesType = typeValue === 'all' || card.dataset.tipo === typeValue;
      const matchesAge = ageValue === 'all' || card.dataset.idade === ageValue;
      const matchesSize = sizeValue === 'all' || card.dataset.porte === sizeValue;
      const matchesCity = cityValue === 'all' || card.dataset.cidade === cityValue;
      const nameText = (card.dataset.nome || '').toLowerCase();
      const breedText = (card.dataset.raca || '').toLowerCase();
      const matchesSearch = !searchValue || nameText.includes(searchValue) || breedText.includes(searchValue);

      card.classList.toggle('hidden', !(matchesQuick && matchesType && matchesAge && matchesSize && matchesCity && matchesSearch));
    });

    saveFilters();
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((filterButton) => filterButton.classList.remove('active'));
      button.classList.add('active');
      applyFilters();
    });
  });

  [tipoAnimal, idadeAnimal, porteAnimal, cidadeAnimal, buscarAnimal].forEach((field) => {
    if (!field) return;
    field.addEventListener('input', applyFilters);
    field.addEventListener('change', applyFilters);
  });

  applyFilters();
}