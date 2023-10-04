import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '500px',
  position: 'center-top',
});

const select = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const errorMessage = document.querySelector('p.error');
const catInfo = document.querySelector('div.cat-info');
select.style.display = 'none';
errorMessage.style.display = 'none';

fetchBreeds()
  .then(data => {
    showLoader();
    const optionSelect = data
      .map(object => `<option value="${object.id}">${object.name}</option>`)
      .join('');
    select.insertAdjacentHTML('beforeend', optionSelect);

    select.style.display = 'flex';

    // Recordar que debo cargarlo aqui porque si lo pongo afuera no coge los valores de la promesa (asicronia)
    new SlimSelect({
      select: select,
    });

    hideLoader();
  })
  .catch(error => {
    Notiflix.Notify.failure(errorMessage.textContent);
    hideLoader();
  });

select.addEventListener('change', e => {
  const breedId = e.target.value;
  showLoader();

  fetchCatByBreed(breedId)
    .then(data => {
      const { breeds, url } = data[0];
      // Ojo! breeds tambien es un array
      const { name, description, temperament } = breeds[0];

      const catInfoChild = createCatInfo(url, name, description, temperament);
      catInfo.innerHTML = '';
      catInfo.innerHTML = catInfoChild;

      hideLoader();
    })
    .catch(error => {
      Notiflix.Notify.failure(errorMessage.textContent);
    });
});

function createCatInfo(url, name, description, temperament) {
  return `<img src="${url}" alt="${name}" width="400" height="300" />
      <div>
        <h1>${name}</h1>
        <p>${description}</p>
        <p><strong>Temperament: </strong>${temperament}</p>
      </div>`;
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
