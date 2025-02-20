import { markup } from '/js/render-functions';
import { removeLoadStroke } from '/js/render-functions';
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
let perPage = 15;

export function resetPage() {
  page = 1;
}

export function addPage() {
  page += 1;
}

function endOfList(daddyElement) {
  if (daddyElement) {
    daddyElement.insertAdjacentHTML(
      'beforeend',
      '<p class="loading-text">We\'re sorry, but you\'ve reached the end of search results.</p>'
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

export async function getImage(input) {
  const API_KEY = '48621636-2f551eda37f80f5c324cc68cd';
  const query = encodeURIComponent(input);
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
    markup(data);

    if (data.totalHits < page * perPage) {
      endOfList(load);
      return;
    }

    if (page >= 2) {
      const list = document.querySelector('.gallery__item');
      if (list) {
        const rect = list.getBoundingClientRect();
        window.scrollBy({
          top: rect.height * 2,
          behavior: 'smooth',
        });
      } else {
        console.warn('No gallery items found for scrolling');
      }
    }
  } catch (error) {
    console.error(error);
    box.innerHTML = '';
    load.innerHTML = '';
    iziToast.show({
      ...iziOption,
      message: 'Sorry, an error happened. Try again',
    });
    return;
  }
}
