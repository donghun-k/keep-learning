(() => {
  const pageEls = document.querySelectorAll('.page');
  const closeBtnEl = document.querySelector('.close-btn');
  let pageCount = 0;

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
})();
