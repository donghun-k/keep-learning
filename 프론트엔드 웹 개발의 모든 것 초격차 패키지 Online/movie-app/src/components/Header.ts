import { Component } from '../core';

interface State {
  [key: string]: unknown;
  menus: {
    name: string;
    href: string;
  }[];
}

export default class Header extends Component {
  public state!: State;
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/',
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt3896198',
          },
          {
            name: 'About',
            href: '#/about',
          },
        ],
      },
    });
    window.addEventListener('popstate', () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <a
        href="#/"
        class="logo">
        <span>Movie App</span>
      </a>
      <nav>
        <ul>
          ${this.state.menus
            .map((menu) => {
              const href = menu.href.split('?')[0];
              const hash = location.hash.split('?')[0];
              const isActive = href === hash;
              return /* html */ `
              <li>
                <a
                  class="${isActive ? 'active' : ''}"
                  href="${menu.href}">
                  ${menu.name}
                </a>
              </li>
            `;
            })
            .join('')}
        </ul>
      </nav>
      <a href="#/about" class="user">
        <img src="https://avatars.githubusercontent.com/u/60064471?v=4" alt="User"/>
      </a>
    `;
  }
}
