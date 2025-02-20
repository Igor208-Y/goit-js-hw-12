import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import errorIcon from '../img/error.svg';

const box = document.querySelector('.gallery');
const load = document.querySelector('.load');
const addMoreButton = document.querySelector('.add-more-button');
const iziOption = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  iconUrl: errorIcon,
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};

export function addLoadStroke(daddyElement) {
  if (daddyElement) {
    daddyElement.insertAdjacentHTML(
      'beforeend',
      '<p class="loading-text">Wait, the image is loaded</p><span class="loader"></span>'
    );
  } else {
    console.warn('daddyElement not found');
  }

  if (addMoreButton) {
    addMoreButton.classList.add('hide');
  } else {
    console.warn('addMoreButton element not found');
  }
}

export function removeLoadStroke(daddyElement) {
  if (daddyElement) {
    const textElement = daddyElement.querySelector('.loading-text');
    const loaderElement = daddyElement.querySelector('.loader');

    if (textElement) textElement.remove();
    if (loaderElement) loaderElement.remove();
  } else {
    console.warn('daddyElement not found');
  }

  if (addMoreButton) {
    addMoreButton.classList.remove('hide');
  } else {
    console.warn('addMoreButton element not found');
  }
}

export function markup(data) {
  const { hits } = data;

  if (hits.length === 0) {
    iziToast.show({
      ...iziOption,
      message:
        'Sorry, there are no images matching your search query. Please, try again!',
    });
    box.innerHTML = '';

    return;
  }

  const markup = hits
    .map(
      image =>
        `<li class='gallery__item'>
        <a class='gallery__link' href="${image.largeImageURL}">
        <img class='gallery__img' src="${image.webformatURL}" alt="${image.tags}" />
          <div class="grid">
            <p>Likes</p>
            <p>Views</p>
            <p>Comment</p>
            <p>Downloads</p>
            <span>${image.likes}</span>
            <span>${image.views}</span>
            <span>${image.comments}</span>
            <span>${image.downloads}</span>
          </div>
        </a>
      </li>`
    )
    .join(' ');

  removeLoadStroke(load);

  if (box) {
    box.insertAdjacentHTML('beforeend', markup);
  } else {
    console.warn('Gallery box not found');
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  
  if (box.querySelector('.gallery__item')) {
    lightbox.refresh();
  }
}
