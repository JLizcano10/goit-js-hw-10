import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
const select = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const errorMessage = document.querySelector('p.error');
const catInfo = document.querySelector('div.cat-info');

select.style.display = 'none';

fetchBreeds().then(data => {
  const optionSelect = data
    .map(object => `<option value="${object.id}">${object.name}</option>`)
    .join('');
  select.insertAdjacentHTML('beforeend', optionSelect);

  select.style.display = 'flex';

  // Recordar que debo cargarlo aqui porque si lo pongo afuera no coge los valores de la promesa (asicronia)
  new SlimSelect({
    select: select,
  });
});
