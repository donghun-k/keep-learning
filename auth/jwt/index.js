const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'doradora';
const REFRESH_SECRET_KEY = 'doradora';
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

const REFRESHES_TOKENS = [];

function authMiddleware(req, res, next) {
  // 토큰을 request headers에서 가져오기
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  // 유효한 토큰인지 확인
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const app = express();

app.use(express.json()); // application/json 파싱 미들웨어
app.use(cookieParser()); // 쿠키 파싱 미들웨어

app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = { name: username };

  // jwt를 이용해서 토큰 생성하기 payload + secretKey
  // 유효기간 추가
  const accessToken = jwt.sign(user, SECRET_KEY, { expiresIn: '30s' });
  // jwt를 이용해서 refreshToken 생성하기
  const refreshToken = jwt.sign(user, REFRESH_SECRET_KEY, {
    expiresIn: '1d',
  });

  // refreshToken을 쿠키에 넣어주기
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  REFRESHES_TOKENS.push(refreshToken);

  res.json({ accessToken });
});

app.get('/posts', authMiddleware, (req, res) => {
  res.json(POSTS);
});

app.get('/refresh', (req, res) => {
  // 쿠키 가져오기 with cookie-parser
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(403);

  const refreshToken = cookies.jwt;
  // refreshToken이 DB에 있는지 확인
  if (!REFRESHES_TOKENS.includes(refreshToken)) return res.sendStatus(403);

  // refreshToken이 유효하다면 accessToken 재발급
  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ name: user.name }, SECRET_KEY, {
      expiresIn: '30s',
    });
    res.json({ accessToken });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
