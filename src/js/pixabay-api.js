import { markup, removeLoadStroke } from './render-functions';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
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

let page = 1;
let perPage = 40;

export function resetPage() {
  page = 1;
}

export function addPage() {
  page += 1;
}

function endOfList(daddyElement) {
  removeLoadStroke(daddyElement);
  addMoreButton.classList.add('hide');

  const endMessage = daddyElement.querySelector('.loading-text');
  if (endMessage) endMessage.remove();

  daddyElement.insertAdjacentHTML(
    'beforeend',
    '<p class="loading-text">We\'re sorry, but you\'ve reached the end of search results.</p>'
  );
}

export async function getImage(input) {
  const API_KEY = '48927114-800727f947c08d044ecb8ca31';
  const query = encodeURIComponent(input);

  if (page === 1) {
    box.innerHTML = '';
    addMoreButton.classList.remove('hide');
  }

  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: query, 
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });

  const URL = `https://pixabay.com/api/?${urlParams}`;

  try {
    const { data } = await axios.get(URL);
    const { hits, totalHits } = data;

    if (hits.length === 0) {
      box.innerHTML = ''; 
      removeLoadStroke(load);
      addMoreButton.classList.add('hide');
      iziToast.show({
        ...iziOption,
        message: 'Sorry, there are no images matching your search query. Please, try again!',
      });
      return;
    }

    markup(data);
    removeLoadStroke(load);

    if (totalHits < page * perPage) {
      endOfList(load);
      return;
    }

    if (page >= 2) {
      const lastItem = document.querySelector('.gallery__item:last-child');
      if (lastItem) {
        const rect = lastItem.getBoundingClientRect();
        window.scrollBy({
          top: rect.height * 2,
          behavior: 'smooth',
        });
      }
    }
  } catch (error) {
    console.error(error);
    box.innerHTML = ''; 
    removeLoadStroke(load); 
    addMoreButton.classList.add('hide'); 
    iziToast.show({
      ...iziOption,
      message: 'Sorry, an error happened. Try again',
    });
  }
}








