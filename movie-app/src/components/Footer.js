import { Component } from '../core';

export default class Footer extends Component {
  constructor() {
    super({
      tagName: 'footer',
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <div>
        <a href="https://github.com/donghun-K/front-end-exercises">Github Repository</a>
      </div>
      <div>
        <a href="https://github.com/donghun-K">
          ${new Date().getFullYear()}
          Donghun, Kim
        </a>
      </div>
    `;
  }
}
