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
  fetchCountry(refs.input.value.trim()).then(value => {
    console.log(value);
    if (value.length === 1) {
      refs.list.innerHTML = '';
      refs.info.innerHTML = markup.makeCard(value);
    } else if (value.length > 1 && value.length < 11) {
      refs.info.innerHTML = '';
      refs.list.innerHTML = markup.makeList(value);
    } else if (refs.input.value.trim() === '') {
      Notiflix.Notify.warning('please enter country name');
      return;
    }
  });
}
