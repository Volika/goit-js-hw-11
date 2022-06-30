import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

// import "simplelightbox/dist/simple-lightbox.min.css";
// import { galleryItems } from './gallery-items';
const STORAGE_KEY = 'search-form-state';

const form = document.querySelector('.search-form');

// form.addEventListener('input', throttle(onFormInput, 300));
form.addEventListener('submit', onFormSubmit);

let formInput = {
    "searchQuery": '',
}
let searchText = '';
// function onFormInput(evt) {
//     formInput[evt.target.name] = evt.target.value;
//     console.log(formInput[evt.target.name]);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formInput));
// }

function onFormSubmit(evt) {
    evt.preventDefault();
    searchText = evt.currentTarget.searchQuery.value.trim();
    console.log(searchText);

}