import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 상영 중인 영화 목록 가져오기
    const res = await axios.get(requests.fetchNowPlaying);
    // 랜덤으로 하나 선택 후 id 가져오기
    const movieId =
      res.data.results[Math.floor(Math.random() * res.data.results.length - 1)]
        .id;
    // 선택된 영화 정보 가져오기
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: {
        append_to_response: 'videos',
      },
    });
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner__buttons">
          {movie?.videos?.results[0]?.key && (
            <button className="banner__button play">Play</button>
          )}
        </div>
        <p className="banner__description">{truncate(movie.overview, 100)}</p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
