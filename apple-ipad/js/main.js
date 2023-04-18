// 장바구니
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

// 검색바
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  document.documentElement.classList.add('fixed');
  headerMenuEls.reverse().forEach((el, i) => {
    el.style.transitionDelay = (i * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.4) / searchDelayEls.length + 's';
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach((el, i) => {
    el.style.transitionDelay = (i * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach((el, i) => {
    el.style.transitionDelay = (i * 0.4) / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse();
  searchInputEl.value = '';
}

// 요소 가시성 검사
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach((el) => {
  io.observe(el);
});

// 비디오 재생
const videoEl = document.querySelector('.stage video');
const playBtnEl = document.querySelector('.stage .controller--play');
const pauseBtnEl = document.querySelector('.stage .controller--pause');

playBtnEl.addEventListener('click', () => {
  videoEl.play();
  playBtnEl.classList.add('hide');
  pauseBtnEl.classList.remove('hide');
});
pauseBtnEl.addEventListener('click', () => {
  videoEl.pause();
  playBtnEl.classList.remove('hide');
  pauseBtnEl.classList.add('hide');
});
