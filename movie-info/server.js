import express from 'express';
import cors from 'cors';
import movies from './movie.json' assert { type: 'json' };
import fs from 'fs';
import { getInitialHTML } from './dist/index.js';

const port = 3000;
const app = express();
app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  fs.readFile('index.html', (err, file) => {
    const renderedHTML = file
      .toString()
      .replace('<!-- app -->', getInitialHTML['/']);
    res.send(renderedHTML);
  });
});

const getFilteredMovies = (query) => {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

app.get('/search', (req, res) => {
  const query = req.query.query;
  const filteredMovies = getFilteredMovies(query);
  const initialData = {
    movies: filteredMovies,
  };
  fs.readFile('index.html', (err, file) => {
    const renderedHTML = file.toString().replace(
      '<!-- app -->',
      /* html */ `
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}
        </script>
      ` + getInitialHTML['/search'](initialData)
    );
    res.send(renderedHTML);
  });
});

app.get('/api/search', (req, res) => {
  const query = req.query.query;
  const filteredMovies = getFilteredMovies(query);
  res.json(filteredMovies);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
