const petRecords = [
  { name: 'Luna', type: 'cachorro', age: 'adulto', size: 'medio', city: 'campinas', breed: 'labrador', image: 'imagem-05.jpg', alt: 'Luna, cachorra adulta', cardSize: 'large', badge: 'Cachorra', details: 'Adulta • Média' },
  { name: 'Nina', type: 'gato', age: 'filhote', size: 'pequeno', city: 'são-paulo', breed: 'siamês', image: 'imagem-02.jpg', alt: 'Nina, gata filhote', cardSize: 'medium', badge: 'Gata', details: 'Filhote • Pequena' },
  { name: 'Bento', type: 'cachorro', age: 'filhote', size: 'pequeno', city: 'santos', breed: 'shih tzu', image: 'imagem-09.jpg', alt: 'Bento, filhote de cachorro', cardSize: 'small', badge: 'Filhote', details: 'Pequeno' },
  { name: 'Sol', type: 'gato', age: 'adulto', size: 'medio', city: 'campinas', breed: 'persa', image: 'imagem-08.jpg', alt: 'Sol, gato adulto', cardSize: 'small', badge: 'Gato', details: 'Adulto' },
  { name: 'Thor', type: 'cachorro', age: 'idoso', size: 'grande', city: 'são-paulo', breed: 'pastor alemão', image: 'imagem-04.jpg', alt: 'Thor, cachorro idoso', cardSize: 'medium', badge: 'Cachorro', details: 'Idoso • Grande' },
  { name: 'Mimi', type: 'gato', age: 'adulto', size: 'pequeno', city: 'santos', breed: 'angorá', image: 'imagem-01.jpg', alt: 'Mimi, gata adulta', cardSize: 'large', badge: 'Gata', details: 'Adulta • Pequena' },
];

export function renderAnimalGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  const petTemplate = document.getElementById('pet-card-template');

  if (!galleryGrid || !petTemplate) return;

  const cardFragment = document.createDocumentFragment();

  petRecords.forEach((pet) => {
    const card = petTemplate.content.firstElementChild.cloneNode(true);
    const image = card.querySelector('img');

    card.classList.add(pet.cardSize);
    card.dataset.tipo = pet.type;
    card.dataset.idade = pet.age;
    card.dataset.porte = pet.size;
    card.dataset.cidade = pet.city;
    card.dataset.nome = pet.name.toLowerCase();
    card.dataset.raca = pet.breed;
    image.src = new URL(`../images/${pet.image}`, import.meta.url).href;
    image.alt = pet.alt;
    card.querySelector('[data-pet-name]').textContent = pet.name;
    card.querySelector('[data-pet-badge]').textContent = pet.badge;
    card.querySelector('[data-pet-details]').textContent = pet.details;
    cardFragment.append(card);
  });

  galleryGrid.replaceChildren(cardFragment);
}