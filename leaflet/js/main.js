(() => {
  const handEl = document.querySelector('.hand');
  const leaflet = document.querySelector('.leaflet');
  const pageEls = document.querySelectorAll('.page');
  const closeBtnEl = document.querySelector('.close-btn');
  const menuItemEls = document.querySelectorAll('.menu-item');
  const backBtnEls = document.querySelectorAll('.back-btn');
  let pageCount = 0;

  console.log(backBtnEls);

  function zoomIn(el) {
    const rect = el.getBoundingClientRect();
    const dx = window.innerWidth / 2 - rect.left - rect.width / 2;
    const dy = window.innerHeight / 2 - rect.top - rect.height / 2;

    let angle;

    switch (Number(el.parentNode.parentNode.parentNode.dataset.page)) {
      case 1:
        angle = -30;
        break;
      case 2:
        angle = 0;
        break;
      case 3:
        angle = 30;
        break;
    }
    document.body.classList.add('zoom-in');
    leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 20vw) rotateY(${angle}deg)`;
    el.classList.add('current-menu');
  }

  function zoomOut() {
    document.body.classList.remove('zoom-in');
    leaflet.style.transform = '';
    document.querySelector('.current-menu')?.classList.remove('current-menu');
  }

  pageEls.forEach((pageEl, i) => {
    if (i == 1) return;
    pageEl.addEventListener('click', (e) => {
      if (e.target === closeBtnEl) return;
      pageEl.classList.add('page-flipped');
      pageCount++;
      if (pageCount === 2) {
        document.body.classList.add('leaflet-opened');
      }
    });
  });

  closeBtnEl.addEventListener('click', () => {
    pageCount = 0;
    zoomOut();
    pageEls[2].classList.remove('page-flipped');
    setTimeout(() => {
      pageEls[0].classList.remove('page-flipped');
    }, 500);
  });

  menuItemEls.forEach((menuItemEl) => {
    menuItemEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('back-btn')) return;
      if (document.body.classList.contains('zoom-in')) return;
      zoomIn(menuItemEl);
    });
  });

  backBtnEls.forEach((backBtnEl) => {
    backBtnEl.addEventListener('click', (e) => {
      console.log('back');
      zoomOut();
    });
  });

  window.addEventListener('mousemove', (e) => {
    handEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
})();
