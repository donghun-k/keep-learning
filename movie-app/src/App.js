import { Component } from './core';
import Header from './components/Header';

export default class App extends Component {
  render() {
    const header = new Header().el;
    const routerView = document.createElement('router-view');

    this.el.append(header, routerView);
  }
}
