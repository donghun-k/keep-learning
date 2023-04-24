import { Component } from '../core/core';

export default class About extends Component {
  render() {
    const { a, b, c } = history.state;
    this.el.innerHTML = /*html*/ `
      <h1>About Page!</h1>
      <p>a: ${a}</p>
      <p>b: ${b}</p>
      <p>c: ${c}</p>
    `;
  }
}
