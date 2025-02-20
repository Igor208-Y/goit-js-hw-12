import { getImage, resetPage, addPage } from './js/pixabay-api';
import { addLoadStroke, removeLoadStroke } from './js/render-functions';
import errorIcon from './img/error.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const box = document.querySelector('.gallery');
const load = document.querySelector('.load');
const addMoreButton = document.querySelector('.add-more-button');
const form = document.querySelector('.form');
const input = document.querySelector('.user-input');

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

if (!form || !input || !box || !load || !addMoreButton) {
  console.error('One or more required elements not found in DOM');
} else {
  let currentQuery = '';

  form.addEventListener('submit', event => {
    event.preventDefault();
    const inputValue = input.value.trim();
    if (!inputValue) {
      iziToast.show({
        ...iziOption,
        message: 'Please enter the search query',
      });
      return;
    }
    currentQuery = inputValue; 
    box.innerHTML = '';
    resetPage();
    addLoadStroke(load);
    getImage(currentQuery).finally(() => {
      removeLoadStroke(load);
    });
  });

  addMoreButton.addEventListener('click', event => {
    if (!currentQuery) {
      iziToast.show({
        ...iziOption,
        message: 'No query to load more images. Please search again.',
      });
      return;
    }
    addPage();
    addLoadStroke(load);
    getImage(currentQuery).finally(() => {
      removeLoadStroke(load);
    });
  });
}





