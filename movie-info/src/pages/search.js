export const getInitialHTML = (initialData) => {
  return /* html */ `
    <h1>Search Results</h1>
      ${initialData.movies
        .map(
          (movie) => /* html */ `
          <div class="movie">
            <p>${movie.title}</p>
            <button type="button">click</button>          
          </div>
        `
        )
        .join('')}
    `;
};

export const renderSearch = async ({ searchParams, initialData }) => {
  if (!initialData) {
    document.querySelector('#app').innerHTML = getInitialHTML();

    const res = await fetch(
      (import.meta.env.DEV ? 'http://localhost:3000' : '') +
        `/api/search?query=${searchParams.query}`
    );
    const movies = await res.json();

    document.querySelector('#app').innerHTML = getInitialHTML({ movies });
  }

  Array.from(document.querySelectorAll('.movie button')).forEach((button) => {
    button.addEventListener('click', () => {
      console.log('clicked');
    });
  });
};
