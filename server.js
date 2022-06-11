const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('', (err, client) => {
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
  res.send('전송 완료');
  console.log(req.body);
});
