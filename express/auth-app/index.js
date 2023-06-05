const express = require('express');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'doradora';
const POSTS = [
  {
    username: 'DongHun, Kim',
    title: 'I love JooHyun',
  },
  {
    username: 'JooHyun, Choi',
    title: 'I love DongHun',
  },
];

const app = express();

app.use(express.json()); // application/json 파싱 미들웨어

app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = { name: username };

  // jwt를 이용해서 토큰 생성하기 payload + secretKey
  const accessToken = jwt.sign(user, SECRET_KEY);
  res.json({ accessToken });
});

app.get('/posts', (req, res) => {
  res.json(POSTS);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
