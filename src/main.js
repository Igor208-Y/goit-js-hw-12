import { getImage } from './js/pixabay-api';
import errorIcon from './img/error.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const iziOption = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  iconUrl: errorIcon,
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault(); 

  const inputField = document.querySelector('.user-input');
  const input = inputField.value.trim();
  const box = document.querySelector('.gallery');

  if (!input) {
    iziToast.show({
      ...iziOption,
      message: 'Please enter the search query',
    });
    return;
  }
    
  box.innerHTML =
    '<p>Wait, the image is loaded</p><span class="loader"></span>';
  
  getImage(input).then(() => {

    inputField.value = '';
  });
});

