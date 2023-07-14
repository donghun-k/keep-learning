(function () {
  const houseEl = document.querySelector('.house');
  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener('scroll', () => {
    const zMove = (scrollY / maxScrollValue) * 980 - 500;
    houseEl.style.transform = `translateZ(${zMove}vw)`;
  });

  window.addEventListener('resize', resizeHandler);

  resizeHandler();
})();
