import { Component } from '../core';
import movieStore, { getMovieDetails } from '../store/movie';

export default class MovieItem extends Component {
  async render() {
    await getMovieDetails(history.state.id);
    console.log(movieStore.state.movie);
  }
}
