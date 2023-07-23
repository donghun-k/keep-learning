function Character(info) {
  this.mainEl = document.createElement('div');
  this.mainEl.classList.add('character');
  this.mainEl.innerHTML =
    '<div class="character-face-con character-head">' +
    '<div class="character-face character-head-face face-front"></div>' +
    '<div class="character-face character-head-face face-back"></div>' +
    '</div>' +
    '<div class="character-face-con character-torso">' +
    '<div class="character-face character-torso-face face-front"></div>' +
    '<div class="character-face character-torso-face face-back"></div>' +
    '</div>' +
    '<div class="character-face-con character-arm character-arm-right">' +
    '<div class="character-face character-arm-face face-front"></div>' +
    '<div class="character-face character-arm-face face-back"></div>' +
    '</div>' +
    '<div class="character-face-con character-arm character-arm-left">' +
    '<div class="character-face character-arm-face face-front"></div>' +
    '<div class="character-face character-arm-face face-back"></div>' +
    '</div>' +
    '<div class="character-face-con character-leg character-leg-right">' +
    '<div class="character-face character-leg-face face-front"></div>' +
    '<div class="character-face character-leg-face face-back"></div>' +
    '</div>' +
    '<div class="character-face-con character-leg character-leg-left">' +
    '<div class="character-face character-leg-face face-front"></div>' +
    '<div class="character-face character-leg-face face-back"></div>' +
    '</div>';

  document.querySelector('.stage').appendChild(this.mainEl);

  this.mainEl.style.left = `calc(${info.xPos}% - 5vw)`;

  this.scrollState = false;
  this.runningState = false;
  this.xPos = info.xPos;
  this.speed = 0.3;
  this.lastScrollTop = 0;
  this.direction;
  this.rafID;
  this.init();
}

Character.prototype = {
  constructor: Character,
  init: function () {
    const self = this;
    window.addEventListener('scroll', function () {
      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainEl.classList.add('running');
      }

      self.scrollState = setTimeout(function () {
        self.scrollState = false;
        self.mainEl.classList.remove('running');
      }, 100);

      if (self.lastScrollTop > window.scrollY) {
        self.mainEl.setAttribute('data-direction', 'backward');
      } else {
        self.mainEl.setAttribute('data-direction', 'forward');
      }

      self.lastScrollTop = window.scrollY;
    });

    window.addEventListener('keydown', function (e) {
      if (self.runningState) return;

      if (e.key === 'ArrowLeft') {
        self.direction = 'left';
        self.mainEl.setAttribute('data-direction', 'left');
        self.mainEl.classList.add('running');
        self.run();
        self.runningState = true;
      } else if (e.key === 'ArrowRight') {
        self.direction = 'right';
        self.mainEl.setAttribute('data-direction', 'right');
        self.mainEl.classList.add('running');
        self.run();
        self.runningState = true;
      }
    });

    window.addEventListener('keyup', function (e) {
      self.mainEl.classList.remove('running');
      this.cancelAnimationFrame(self.rafID);
      self.runningState = false;
    });
  },
  run: function () {
    const self = this;
    if (self.direction === 'left') {
      self.xPos -= self.speed;
    } else if (self.direction === 'right') {
      self.xPos += self.speed;
    }

    if (self.xPos < 10) {
      self.xPos = 10;
    }

    if (self.xPos > 90) {
      self.xPos = 90;
    }

    self.mainEl.style.left = `calc(${self.xPos}% - 5vw)`;

    self.rafID = requestAnimationFrame(self.run.bind(self));
  },
};
