(() => {
  const pageEls = document.querySelectorAll('.page');
  pageEls.forEach((pageEl, i) => {
    if (i == 1) return;
    pageEl.addEventListener('click', () => {
      pageEl.classList.add('page-flipped');
    });
  });
})();
