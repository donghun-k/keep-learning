const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = 4000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
  });

app.use('/static', express.static(path.join(__dirname, 'public'))); // 정적 파일 위치 설정

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
