// Add imports above this line
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items.js';

// Change code below this line

const galleryList = document.querySelector('.gallery');
galleryList.style.listStyle = 'none';

const createGalleryItem = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}">
      </a>
    </li>
  `;
};

const renderGallery = items => {
  const galleryElements = items.map(createGalleryItem).join('');
  galleryList.innerHTML = galleryElements;
};

renderGallery(galleryItems);

galleryList.addEventListener('click', event => {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const source = target.dataset.source;
  console.log(source);

  const lightbox = new SimpleLightbox('.gallery__link', {
    captions: true,
    captionsDelay: 250,
    captionsData: 'alt',
  });
});
