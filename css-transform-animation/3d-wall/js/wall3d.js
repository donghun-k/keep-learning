(function () {
  const houseEl = document.querySelector('.house');
  const barEl = document.querySelector('.progress-bar');
  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener('scroll', () => {
    const scrollPercent = scrollY / maxScrollValue;
    const zMove = scrollPercent * 980 - 500;
    houseEl.style.transform = `translateZ(${zMove}vw)`;

    barEl.style.width = scrollPercent * 100 + '%';
  });

  window.addEventListener('resize', resizeHandler);

  resizeHandler();
})();
