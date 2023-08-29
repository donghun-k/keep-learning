(() => {
  const pageEls = document.querySelectorAll('.page');
  let pageCount = 0;

  pageEls.forEach((pageEl, i) => {
    if (i == 1) return;
    pageEl.addEventListener('click', () => {
      pageEl.classList.add('page-flipped');
      pageCount++;
      if (pageCount === 2) {
        document.body.classList.add('leaflet-opened');
      }
    });
  });
})();
