import { Component } from './core/core';

export default class App extends Component {
  // 생략 가능한 부분
  // constructor() {
  //   super();
  // }
  render() {
    this.el.textContent = 'Hello World';
  }
}
