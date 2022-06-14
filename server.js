require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

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
  res.render('index.ejs');
});

app.get('/write', (req, res) => {
  res.render('write.ejs');
});

app.get('/list', (req, res) => {
  db.collection('post')
    .find()
    .toArray((err, result) => {
      res.render('list.ejs', { posts: result });
    });
});

app.get('/detail/:id', (req, res) => {
  db.collection('post').findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      res.render('detail.ejs', { data: result });
    }
  );
});

app.post('/add', (req, res) => {
  db.collection('counter').findOne({ name: '게시물 수' }, (err, result) => {
    const totalPost = result.totalPost;
    console.log(req.body);

    db.collection('post').insertOne(
      {
        _id: totalPost + 1,
        title: req.body.title,
        date: req.body.date,
        content: req.body.content,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        res.send('등록 완료');
        db.collection('counter').updateOne(
          { name: '게시물 수' },
          { $inc: { totalPost: 1 } },
          () => {}
        );
      }
    );
  });
});

app.delete('/delete', (req, res) => {
  req.body._id = parseInt(req.body._id);
  db.collection('post').deleteOne({ _id: req.body._id }, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('삭제 완료');
    res.status(200).send({ message: '삭제했습니다.' });
  });
});
