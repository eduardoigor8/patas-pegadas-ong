import { initializeNavigation } from './navigation.js';
import { initializeSpaRouter } from './spa-router.js';
import { initializeAdoptionForm } from './adoption-form.js';
import { renderAnimalGallery } from './animal-gallery.js';
import { initializeAnimalFilters } from './animal-filters.js';
import { initializeAppearance } from './appearance.js';

const initializePageContent = () => {
  initializeAdoptionForm();
  renderAnimalGallery();
  initializeAnimalFilters();
};

document.addEventListener('DOMContentLoaded', () => {
  initializeAppearance();
  initializeNavigation();
  initializePageContent();
  initializeSpaRouter(initializePageContent);
});