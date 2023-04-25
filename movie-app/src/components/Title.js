import { Component } from '../core/core';
import messageStore from '../store/message';

export default class Title extends Component {
  constructor() {
    super({
      tagName: 'h1',
    });
    messageStore.subscribe('message', (newVal) => {
      console.log('Title', newVal);
      this.render();
    });
  }
  render() {
    this.el.textContent = `Title ${messageStore.state.message}`;
  }
}
