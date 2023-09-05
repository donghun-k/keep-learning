(() => {
  const handEl = document.querySelector('.hand');
  const leaflet = document.querySelector('.leaflet');
  const pageEls = document.querySelectorAll('.page');
  const closeBtnEl = document.querySelector('.close-btn');
  const menuItemEls = document.querySelectorAll('.menu-item');
  const backBtnEls = document.querySelectorAll('.back-btn');
  let pageCount = 0;

  const handPos = { x: 0, y: 0 };
  const targetPos = { x: 0, y: 0 };
  let distX = 0;
  let distY = 0;

  function zoomIn(el) {
    const rect = el.getBoundingClientRect();
    const dx = window.innerWidth / 2 - rect.left - rect.width / 2;
    const dy = window.innerHeight / 2 - rect.top - rect.height / 2;

    let angle;

    switch (Number(el.parentNode.parentNode.parentNode.dataset.page)) {
      case 1:
        angle = -30;
        break;
      case 2:
        angle = 0;
        break;
      case 3:
        angle = 30;
        break;
    }
    document.body.classList.add('zoom-in');
    leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 20vw) rotateY(${angle}deg)`;
    el.classList.add('current-menu');
  }

  function zoomOut() {
    document.body.classList.remove('zoom-in');
    leaflet.style.transform = '';
    document.querySelector('.current-menu')?.classList.remove('current-menu');
  }

  function render() {
    distX = targetPos.x - handPos.x;
    distY = targetPos.y - handPos.y;
    handPos.x += distX * 0.1;
    handPos.y += distY * 0.1;
    if (document.body.classList.contains('zoom-in')) {
      handEl.style.transform = `translate(${handPos.x - 130}px, ${
        handPos.y + 5
      }px)`;
    } else {
      handEl.style.transform = `translate(${handPos.x - 65}px, ${
        handPos.y + 10
      }px)`;
    }

    requestAnimationFrame(render);
  }

  render();

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
    zoomOut();
    pageEls[2].classList.remove('page-flipped');
    setTimeout(() => {
      pageEls[0].classList.remove('page-flipped');
    }, 500);
  });

  menuItemEls.forEach((menuItemEl) => {
    menuItemEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('back-btn')) return;
      if (document.body.classList.contains('zoom-in')) return;
      zoomIn(menuItemEl);
    });
  });

  backBtnEls.forEach((backBtnEl) => {
    backBtnEl.addEventListener('click', (e) => {
      console.log('back');
      zoomOut();
    });
  });

  window.addEventListener('mousemove', (e) => {
    targetPos.x = e.clientX;
    targetPos.y = e.clientY;
  });
})();
