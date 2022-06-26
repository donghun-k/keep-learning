require('dotenv').config();

const express = require('express');
const app = express();

// Session 이용한 로그인 기능 구현에 필요한 라이브러리들 세팅
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(
  session({ secret: '비밀코드', resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// body-parser 사용
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ejs 사용
app.set('view engine', 'ejs');

// public 폴더 사용한다고 알려주기
app.use('/public', express.static('public'));

// method-override 사용
const methodOverride = require('method-override');
const e = require('express');
app.use(methodOverride('_method'));

// MongoDB 연결
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

// 라우팅
app.get('/', (req, res) => {
  res.render('index.ejs', { auth: req.user });
});

app.get('/write', checkAuth, (req, res) => {
  res.render('write.ejs', { auth: req.user });
});

app.get('/list', checkAuth, (req, res) => {
  db.collection('post')
    .find({ author: req.user.id })
    .toArray((err, result) => {
      res.render('list.ejs', { posts: result, auth: req.user });
    });
});

app.get('/signin', (req, res) => {
  res.render('signin.ejs', { auth: req.user });
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs', { auth: req.user });
});

app.get('/detail/:id', checkAuthor, (req, res) => {
  db.collection('post').findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      res.render('detail.ejs', { data: result, auth: req.user });
    }
  );
});

app.get('/edit/:id', checkAuthor, (req, res) => {
  db.collection('post').findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      res.render('edit.ejs', { data: result, auth: req.user });
    }
  );
});

// 게시글 등록, 수정, 삭제
app.post('/add', (req, res) => {
  db.collection('counter').findOne({ name: '게시물 수' }, (err, result) => {
    const totalPost = result.totalPost;
    console.log(req.body);

    db.collection('post').insertOne(
      {
        _id: totalPost + 1,
        author: req.user.id,
        title: req.body.title,
        date: req.body.date,
        content: req.body.content,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        db.collection('counter').updateOne(
          { name: '게시물 수' },
          { $inc: { totalPost: 1 } },
          () => {}
        );
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write("<script>alert('등록했습니다.')</script>");
        res.write("<script>window.location='/list'</script>");
      }
    );
  });
});

app.put('/edit', (req, res) => {
  db.collection('post').updateOne(
    { _id: parseInt(req.body.id) },
    {
      $set: {
        title: req.body.title,
        date: req.body.date,
        content: req.body.content,
      },
    },
    (err, result) => {
      console.log('수정 완료');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write("<script>alert('수정했습니다.')</script>");
      res.write(`<script>window.location=\"/detail/${req.body.id}\"</script>`);
      // res.redirect(`/detail/${req.body.id}`);
    }
  );
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

// 회원가입

// 로그인 / 로그아웃
app.post(
  '/signin',
  passport.authenticate('local', { failureRedirect: '/fail' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/signout', (req, res) => {
  req.logout((err, result) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write("<script>alert('로그아웃 했습니다.')</script>");
    res.write(`<script>window.location=\"/\"</script>`);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'pw',
      session: true,
      passReqToCallback: false,
    },
    (inputId, inputPw, done) => {
      console.log(inputId, inputPw);
      db.collection('login').findOne({ id: inputId }, (err, result) => {
        if (err) return done(err);
        // 입력한 id로 검색한 결과가 없을 경우
        if (!result)
          return done(null, false, { message: '존재하지않는 아이디입니다.' });
        // 입력한 id로 검색한 결과는 있는데 입력한 pw와 DB 데이터의 pw가 다를 경우
        if (inputPw == result.pw) {
          return done(null, result);
        } else {
          return done(null, false, { message: '비밀번호가 틀렸습니다.' });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.collection('login').findOne({ id: id }, (err, result) => {
    done(null, result);
  });
});

function checkAuth(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write("<script>alert('로그인 해주세요.')</script>");
    res.write(`<script>window.location=\"/signin\"</script>`);
  }
}

function checkAuthor(req, res, next) {
  if (req.user) {
    db.collection('post').findOne(
      { _id: parseInt(req.params.id) },
      (err, result) => {
        if (result.author == req.user.id) {
          next();
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.write("<script>alert('권한이 없습니다.')</script>");
          res.write(`<script>window.location=\"/signin\"</script>`);
        }
      }
    );
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write("<script>alert('로그인 해주세요.')</script>");
    res.write(`<script>window.location=\"/signin\"</script>`);
  }
}
