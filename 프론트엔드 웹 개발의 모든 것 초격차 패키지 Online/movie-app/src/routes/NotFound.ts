import { Component } from '../core';

export default class NotFound extends Component {
  render() {
    this.el.classList.add('container', 'not-found');
    this.el.innerHTML = /* html */ `
      <h1>
        페이지를<br />
        찾을 수 없습니다...
      </h1>
    `;
  }
}
