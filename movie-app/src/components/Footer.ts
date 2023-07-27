import { Component } from '../core';
import aboutStore from '../store/about';

export default class Footer extends Component {
  constructor() {
    super({
      tagName: 'footer',
    });
  }
  render() {
    const { github, repo } = aboutStore.state;
    this.el.innerHTML = /* html */ `
      <div>
        <a href="${repo}">Github Repository</a>
      </div>
      <div>
        <a href="${github}">
          ${new Date().getFullYear()}
          Donghun, Kim
        </a>
      </div>
    `;
  }
}
