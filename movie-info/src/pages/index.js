import { goto } from '../router';

export const renderIndex = () => {
  document.querySelector('#app').innerHTML = /* html */ `
    <h1>Movie Info</h1>
    <form>
      <input type="text" name="query" id="search" placeholder="Search for a movie" />
      <button type="submit">Search</button>
    </form>
  `;

  document.body.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const search = e.target.query.value;
    goto(`/search?query=${search}`, { push: true });
  });
};
