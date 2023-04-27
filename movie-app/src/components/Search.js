import { Component } from '../core';

export default class Search extends Component {
  render() {
    this.el.classList.add('search');
    this.el.innerHTML = /* html */ `
      <input type="text" placeholder="영화 제목을 입력하세요." />
      <button class="btn btn--primary">검색</button>
    `;

    const inputEl = this.el.querySelector('input');
    inputEl.addEventListener('input', () => {});
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
      }
    });

    const btnEl = this.el.querySelector('button');
    btnEl.addEventListener('click', () => {});
  }
}
