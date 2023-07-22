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
  this.lastScrollTop = 0;

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
  },
};
