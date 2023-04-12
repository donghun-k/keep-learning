// Basket
const basketStarterEl = document.querySelector('.basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', (e) => {
  e.stopPropagation();
  if (basketEl.classList.contains('show')) {
    hideBasket();
  } else {
    showBasket();
  }
});

basketEl.addEventListener('click', (e) => {
  e.stopPropagation();
});

window.addEventListener('click', () => {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

// Search
const headerEl = document.querySelector('header');
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  document.documentElement.classList.add('fixed');
}
function hideSearch() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
}
