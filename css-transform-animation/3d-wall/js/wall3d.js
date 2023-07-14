(function () {
  const houseEl = document.querySelector('.house');
  const maxScrollValue = document.body.offsetHeight - window.innerHeight;

  window.addEventListener('scroll', () => {
    const zMove = (pageYOffset / maxScrollValue) * 950 - 490;
    houseEl.style.transform = `translateZ(${zMove}vw)`;
  });
})();
