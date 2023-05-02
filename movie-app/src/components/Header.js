import { Component } from '../core';

export default class Header extends Component {
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
              return /* html */ `
              <li>
                <a href="${menu.href}">${menu.name}</a>
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
