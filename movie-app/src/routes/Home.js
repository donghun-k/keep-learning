import { Component } from '../core/core';
import TextFeild from '../components/TextFeild';
import Message from '../components/Message';
import Title from '../components/Title';

export default class Home extends Component {
  render() {
    this.el.innerHTML = /*html*/ `
      <h1>Home Pages!</h1>
    `;
    this.el.append(new TextFeild().el, new Message().el, new Title().el);
  }
}
