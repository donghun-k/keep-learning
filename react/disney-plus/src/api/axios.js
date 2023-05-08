import axios from 'axios';

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.API_KEY,
    language: 'ko-KR',
  },
});

export default instance;
