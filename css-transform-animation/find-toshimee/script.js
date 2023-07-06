(function () {
  const doorBodyEls = document.querySelectorAll('.door-body');
  const doorBackEls = document.querySelectorAll('.door-back');

  const arr = ['toshimee', 'tomoong', 'tomoong'];

  const clickHandler = (e) => {
    doorBodyEls.forEach((doorBodyEl) => {
      doorBodyEl.removeEventListener('click', clickHandler);
      setTimeout(() => {
        doorBodyEl.addEventListener('click', clickHandler);
      }, 1500);
    });

    e.target.parentElement.classList.add('door--opened');
    setTimeout(() => {
      e.target.parentElement.classList.remove('door--opened');
    }, 1000);
    arr.sort(() => Math.random() - 0.5);
    doorBackEls.forEach((doorBackEl, i) => {
      const toshimmoongEl = doorBackEl.querySelector('.toshimmoong');
      toshimmoongEl.style.backgroundImage = `url(./images/${arr[i]}${
        Math.floor(Math.random() * 3) + 1
      }.png)`;
      if (
        arr[i] === 'toshimee' &&
        e.target.parentElement === doorBackEl.parentElement
      ) {
        setTimeout(() => {
          alert('귀여운 토심이 발견!');
        }, 1000);
      }
    });
  };

  doorBodyEls.forEach((doorBodyEl) => {
    doorBodyEl.addEventListener('click', clickHandler);
  });

  doorBackEls.forEach((doorBackEl) => {});
})();
