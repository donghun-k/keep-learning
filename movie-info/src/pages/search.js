export const getInitialHTML = ({ movies } = {}) => {
  if (movies) {
    console.log('movies is defined');
    return /* html */ `
    <h1>Search Results</h1>
      ${movies
        .map(
          (movie) => /* html */ `
          <div>
            <p>${movie.title}</p>          
          </div>
        `
        )
        .join('')}
    `;
  }
  return /* html */ `
    <h1>Search Results</h1>
    <p>Searching for: </p>
  `;
};

export const renderSearch = async ({ searchParams }) => {
  document.querySelector('#app').innerHTML = getInitialHTML();

  const res = await fetch(
    (import.meta.env.DEV ? 'http://localhost:3000' : '') +
      `/api/search?query=${searchParams.query}`
  );
  const movies = await res.json();

  document.querySelector('#app').innerHTML = /* html */ `
    <h1>Search Results</h1>
    ${movies
      .map(
        (movie) => /* html */ `
        <div>
          <p>${movie.title}</p>          
        </div>
      `
      )
      .join('')}
  `;
};
