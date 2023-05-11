import axios from 'axios';

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '5ead3bc055c6d567e3725cc0de953470',
    language: 'ko-KR',
  },
});

export default instance;
