import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
import {fetchImages, resetPages} from './js/fetch-images'

// import "simplelightbox/dist/simple-lightbox.min.css";
// import { galleryItems } from './gallery-items';
const STORAGE_KEY = 'search-form-state';

const form = document.querySelector('.search-form');
const galleryAll = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const btnToTop = document.querySelector('.btn-to-top');
// form.addEventListener('input', throttle(onFormInput, 300));
form.addEventListener('submit', onFormSubmit);
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt', 
    captionsDelay: 250,
})
btnLoadMore.addEventListener('click', onClickLoadMoreBtn);
btnToTop.addEventListener('click', onClickToTopBtn);
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
    const {totalHits, hits} = await fetchImages(searchText);
    evt.target.reset();
    // const hitsLength = hits.length;
    if (hits.length === 0 ) {
        alertNoImagesFound();
    } else {
        alertYesImagesFound(totalHits);
    }
    renderCards(hits);
    lightbox.refresh();

}
//  разметки карточки одного изображения для галереи

function createCards(cards) {
    return cards.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <a class="gallery__link" href="${largeImageURL}">
    <div class="gallery-item">
    <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
      <b>Likes: </b>${likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${downloads}
    </p>
   </div> 
  </div>
  </a>`).join('');
    
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

function onClickToTopBtn() {
    //  window.scrollTo(screenX, 0);
    if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function alertNoImagesFound() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function alertYesImagesFound(hits) {
    Notify.success(`Hooray! We found ${hits} images.`);
}