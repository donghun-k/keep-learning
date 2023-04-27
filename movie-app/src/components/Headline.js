import { Component } from '../core';

export default class Headline extends Component {
  render() {
    this.el.classList.add('headline');
    this.el.innerHTML = /* html */ `
      <h1>
        <span class="js">JS</span> & <span class="ts">TS</span><br />
        MOVIE APP
      </h1>
      <p>
        JavaScript 및 TypeScript 연습용 프로젝트입니다.
      </p>
    `;
  }
}
