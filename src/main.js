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

let searchQuery = ''; 

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

form.addEventListener('submit', event => {
  event.preventDefault();
  searchQuery = input.value.trim();
  if (!searchQuery) {
    iziToast.show({
      ...iziOption,
      message: 'Please enter the search query',
    });
    return;
  }
  box.innerHTML = '';
  resetPage();
  removeLoadStroke(load);
  addLoadStroke(load);
  addMoreButton.classList.remove('hide');
  getImage(searchQuery);
});

addMoreButton.addEventListener('click', () => {
  if (!searchQuery) return;
  addPage();
  addLoadStroke(load);
  getImage(searchQuery);
});











