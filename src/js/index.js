import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
const select = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const errorMessage = document.querySelector('p.error');
const catInfo = document.querySelector('div.cat-info');
console.log(catInfo);

new SlimSelect({
  select: select,
});
