import { Component } from '../core/core';
import messageStore from '../store/message';

export default class TextFeild extends Component {
  render() {
    this.el.innerHTML = /* html */ `
      <input value="${messageStore.state.message}"/>
    `;
    const inputEl = this.el.querySelector('input');
    inputEl.addEventListener('input', () => {
      messageStore.state.message = inputEl.value;
    });
  }
}
