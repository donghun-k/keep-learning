(function () {
  const houseEl = document.querySelector('.house');
  const stageEl = document.querySelector('.stage');
  const barEl = document.querySelector('.progress-bar');
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener('scroll', () => {
    const scrollPercent = scrollY / maxScrollValue;
    const zMove = scrollPercent * 930 - 500 + 50;
    houseEl.style.transform = `translateZ(${zMove}vw)`;

    barEl.style.width = scrollPercent * 100 + '%';
  });

  window.addEventListener('mousemove', (e) => {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageEl.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${
      mousePos.x * 5
    }deg)`;
  });

  window.addEventListener('resize', resizeHandler);

  resizeHandler();
})();
