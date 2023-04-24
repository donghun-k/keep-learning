import { Component } from './core/core';

export default class App extends Component {
  constructor() {
    super({
      state: {
        inputText: '',
      },
    });
  }
  render() {
    this.el.classList.add('search');
    this.el.innerHTML = /*html*/ `
      <input />
      <button>Click!</button>
    `;

    const inputEl = this.el.querySelector('input');
    inputEl.addEventListener('input', () => {
      this.state.inpuText = inputEl.value;
    });

    const buttonEl = this.el.querySelector('button');
    buttonEl.addEventListener('click', () => {
      console.log('this.state.inpuText', this.state.inpuText);
    });
  }
}
