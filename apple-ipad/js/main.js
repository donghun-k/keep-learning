const basketStarter = document.querySelector('.basket-starter');
const basket = basketStarter.querySelector('.basket');

basketStarter.addEventListener('click', () => {
  basket.classList.toggle('show');
});
