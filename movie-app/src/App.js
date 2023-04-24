import { Component } from './core/core';

export default class App extends Component {
  constructor() {
    super({
      state: {
        fruits: [
          { name: 'apple', price: 1000 },
          { name: 'banana', price: 2000 },
          { name: 'orange', price: 3000 },
        ],
      },
    });
  }
  render() {
    this.el.innerHTML = /*html*/ `
      <h1>Fruits</h1>
      <ul>
        ${this.state.fruits
          .filter((fruit) => fruit.price < 3000)
          .map(
            (fruit) => /*html*/ `
            <li>${fruit.name} is ${fruit.price}</li>
          `
          )
          .join('')}
      </ul>
    `;
  }
}
