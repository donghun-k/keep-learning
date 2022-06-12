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

app.get('/list', (req, res) => {
  db.collection('post')
    .find()
    .toArray((err, result) => {
      res.render('list.ejs', { posts: result });
    });
});

app.post('/add', (req, res) => {
  db.collection('counter').findOne({ name: '게시물 수' }, (err, result) => {
    const totalPost = result.totalPost;
    console.log(`totalPost is ${totalPost}`);

    db.collection('post').insertOne(
      { _id: totalPost + 1, title: req.body.title, date: req.body.date },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('게시글 등록 완료');
        db.collection('post')
          .find()
          .toArray((err, result) => {
            res.send('등록 완료');
          });
        db.collection('counter').updateOne(
          { name: '게시물 수' },
          { $inc: { totalPost: 1 } },
          () => {}
        );
      }
    );
  });
});
