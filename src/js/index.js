import '../css/styles.css';
import {refs} from './refs';
import Notiflix from 'notiflix';
import fetchCountries from "./fetchCountries";

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce( onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const value = e.target.value.trim();
if(value){
    fetchCountries(value)
    .then(onCreateList)
    .catch(onError)
} refs.countryInfo.innerHTML = '';
refs.countryList.innerHTML = '';
}

function onCreateList(arreys) {
    if(arreys.length > 1 && arreys.length <= 10  ){

        refs.countryList.innerHTML = arreys.map(arrey => `<li class="country-item">
        <img src ="${arrey.flags.svg} " width = "20" height ="20">
        <h2>${arrey.name.official}</h2>
        </li>`).join('');

    } else if(arreys.length > 10 ){
        Notiflix.Notify.info(' Too many matches found. Please enter a more specific name.');
    }  else {

        refs.countryList.innerHTML = arreys.map(arrey => `<li class="country-item">
        <img src ="${arrey.flags.svg} " width = "20" height ="20">
        <h2>${arrey.name.official}</h2>
        </li>`).join('');
        refs.countryInfo.innerHTML = arreys.map(arrey => `<p><b>Capital:</b> ${arrey.capital}</p> <p><b>Population:</b> ${arrey.population}</p> <p><b>Languages: </b>${Object.values(arrey.languages).join(', ')}</p>`);

    }
}

function onError(error) {
    Notiflix.Notify.failure(`❌ Oops, there is no country with that name`)
}