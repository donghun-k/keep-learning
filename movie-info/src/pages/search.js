export const renderSearch = ({ searchParams }) => {
  document.querySelector('#app').innerHTML = /* html */ `
    <h1>Search Results</h1>
    <p>keyword: ${searchParams.query}</p>
    `;
};
