import './css/styles.css';
import Notiflix from 'notiflix';
import _ from 'lodash';
import { fetchCountry } from './fetchCountry';
import MarkupMethods from './markupMethods';

const markup = new MarkupMethods();

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', _.debounce(onInput, 300));

function onInput() {
  if (refs.input.value.trim().length === 0) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    return;
  }

  fetchCountry(refs.input.value.trim())
    .then(onSuccess)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function onSuccess(value) {
  if (value.length === 1) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = markup.makeCard(value);
  } else if (value.length > 1 && value.length < 11) {
    refs.info.innerHTML = '';
    refs.list.innerHTML = markup.makeList(value);
  } else if (value.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
