import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
import {fetchImages, resetPages} from './js/fatch-images'

// import "simplelightbox/dist/simple-lightbox.min.css";
// import { galleryItems } from './gallery-items';
const STORAGE_KEY = 'search-form-state';

const form = document.querySelector('.search-form');
const galleryAll = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
// form.addEventListener('input', throttle(onFormInput, 300));
form.addEventListener('submit', onFormSubmit);
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt', 
    captionsDelay: 250,
})
btnLoadMore.addEventListener('click', onClickLoadMoreBtn);
// let formInput = {
//     "searchQuery": '',
// }
let searchText = '';
// function onFormInput(evt) {
//     formInput[evt.target.name] = evt.target.value;
//     console.log(formInput[evt.target.name]);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formInput));
// }

async function onFormSubmit(evt) {
    evt.preventDefault();
    clearCardsContainer();
    resetPages();
    searchText = evt.currentTarget.searchQuery.value.trim();
    console.log(searchText);
    const {hits} = await fetchImages(searchText);
    evt.target.reset();

    if (hits.length === 0 ) {
        alert("Sorry, there are no images matching your search query. Please try again.");
    }
    renderCards(hits);
    lightbox.refresh();

}
//  разметки карточки одного изображения для галереи

function createCards(cards) {
    return cards.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
    <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </a>
</div>`).join('');
    
}

function renderCards(cards) {
    galleryAll.insertAdjacentHTML('beforeend', createCards(cards));
}

function clearCardsContainer() {
    galleryAll.innerHTML = '';
}

async function onClickLoadMoreBtn() {
    console.log("onClickLoadMoreBtn");
    const {hits} = await fetchImages(searchText);
    renderCards(hits);
    lightbox.refresh();
    
}