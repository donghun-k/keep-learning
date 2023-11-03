export const getInitialHTML = () => {
  return /* html */ `
    <h1>Search Results</h1>
    <p>Searching for: </p>
  `;
};

export const renderSearch = async ({ searchParams }) => {
  document.querySelector('#app').innerHTML = getInitialHTML();

  const res = await fetch(
    `http://localhost:3000/search?query=${searchParams.query}`
  );
  const movies = await res.json();

  document.querySelector('#app').innerHTML = /* html */ `
    <h1>Search Results</h1>
    ${movies
      .map(
        (movie) => /* html */ `
        <div>
          <h2>${movie.title}</h2>          
        </div>
      `
      )
      .join('')}
  `;
};
