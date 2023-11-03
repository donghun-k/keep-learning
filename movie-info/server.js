import express from 'express';
import cors from 'cors';
import movies from './movie.json' assert { type: 'json' };

const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/search', (req, res) => {
  const query = req.query.query;
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredMovies);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
