const renderIndex = () => {
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

const renderSearch = ({ searchParams }) => {
  document.querySelector('#app').innerHTML = /* html */ `
    <h1>Search Results</h1>
    <p>keyword: ${searchParams.query}</p>
    `;
};

const routes = {
  '/': renderIndex,
  '/search': renderSearch,
};

const goto = (url, { push } = {}) => {
  const pathname = url.split('?')[0];
  const params = Object.fromEntries(new URLSearchParams(url.split('?')[1]));
  if (routes[pathname]) {
    if (push) history.pushState({}, '', url);
    routes[pathname]({
      searchParams: params,
    });
    return;
  }
  location.href = url;
};

window.addEventListener('popstate', () => {
  const pathname = location.pathname;
  if (routes[pathname]) {
    routes[pathname]();
    return;
  }
});

goto(location.pathname + location.search);
