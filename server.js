require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect(process.env.DB_URL, (err, client) => {
  if (err) {
    return console.log(err);
  }

  db = client.db('todolist');

  app.listen(8080, function () {
    console.log('listening on 8080');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
  db.collection('post').insertOne(
    { title: req.body.title, date: req.body.date },
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      res.send('저장 완료');
    }
  );
});
