(function () {
  const doorEls = document.querySelectorAll('.door');

  doorEls.forEach((doorEl) => {
    doorEl.addEventListener('click', () => {
      doorEl.classList.add('door--opened');
      setTimeout(() => {
        doorEl.classList.remove('door--opened');
      }, 1000);
    });
  });
})();
