import { Component } from '../core/core';

export default class FruitItem extends Component {
  constructor({ props }) {
    super({
      tagName: 'li',
      props,
    });
  }
  render() {
    this.el.innerHTML = /*html*/ `
      <span>${this.props.name}</span>
      <span>${this.props.price}</span>
    `;
    this.el.addEventListener('click', () => {
      console.log(this.props.name, this.props.price);
    });
  }
}
