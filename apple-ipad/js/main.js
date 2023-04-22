import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

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
  stopScroll();
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
  playScroll();
  headerMenuEls.reverse().forEach((el, i) => {
    el.style.transitionDelay = (i * 0.4) / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach((el, i) => {
    el.style.transitionDelay = (i * 0.4) / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse();
  searchInputEl.value = '';
}
function playScroll() {
  document.documentElement.classList.remove('fixed');
}
function stopScroll() {
  document.documentElement.classList.add('fixed');
}

// 헤더 메뉴 토글 [모바일]
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click', () => {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing');
    searchInputEl.value = '';
    playScroll();
  } else {
    headerEl.classList.add('menuing');
    stopScroll();
  }
});

// 헤더 검색 [모바일]
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancelEl = document.querySelector('header .search-canceler');
searchTextFieldEl.addEventListener('click', () => {
  headerEl.classList.add('searching--mobile');
  searchInputEl.focus();
});
searchCancelEl.addEventListener('click', () => {
  headerEl.classList.remove('searching--mobile');
});

// 화면 크기가 달라졌을 때 검색 모드가 종료
window.addEventListener('resize', () => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove('searching');
  } else {
    headerEl.classList.remove('searching--mobile');
  }
});

// 네비게이션 토글 [모바일]
const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navMenuToggleEl.addEventListener('click', () => {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
navEl.addEventListener('click', (e) => {
  e.stopPropagation();
});
navMenuShadowEl.addEventListener('click', () => {
  hideNavMenu();
});
window.addEventListener('click', () => {
  hideNavMenu();
});

function showNavMenu() {
  navEl.classList.add('menuing');
}
function hideNavMenu() {
  navEl.classList.remove('menuing');
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

// 당신에게 맞는 iPad는? 렌더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach((ipad) => {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach((color) => {
    colorList += /* html */ `<li style="background-color: ${color}"></li>`;
  });
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  itemsEl.appendChild(itemEl);
});

// 푸터 네비게이션 렌더링
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach((nav) => {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');

  let mapList = '';
  nav.maps.forEach((map) => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});

// 년도
const thisYearEl = document.querySelector('.this-year');
thisYearEl.textContent = new Date().getFullYear();

function replaceAll(str, from, to) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === from) {
      result = result + to;
    } else {
      result = result + str[i];
    }
  }
  return result;
}

// 푸터 내비게이션 맵 아코디언 [모바일]
const mapEls = [...document.querySelectorAll('footer .navigations .map')];
mapEls.forEach((el) => {
  const h3El = el.querySelector('h3');
  h3El.addEventListener('click', () => {
    el.classList.toggle('active');
  });
});
