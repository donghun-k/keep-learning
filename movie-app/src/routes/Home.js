import { Component } from '../core/core';
import TextFeild from '../components/TextFeild';
import Message from '../components/Message';

export default class Home extends Component {
  render() {
    this.el.innerHTML = /*html*/ `
      <h1>Home Pages!</h1>
    `;

    this.el.append(new TextFeild().el, new Message().el);
  }
}
