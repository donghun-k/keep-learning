(() => {
  const leaflet = document.querySelector('.leaflet');
  const pageEls = document.querySelectorAll('.page');
  const closeBtnEl = document.querySelector('.close-btn');
  const menuItemEls = document.querySelectorAll('.menu-item');
  let pageCount = 0;

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

    leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 20vw) rotateY(${angle}deg)`;
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
    pageEls[2].classList.remove('page-flipped');
    setTimeout(() => {
      pageEls[0].classList.remove('page-flipped');
    }, 500);
  });

  menuItemEls.forEach((menuItemEl) => {
    menuItemEl.addEventListener('click', (e) => {
      zoomIn(menuItemEl);
    });
  });
})();
