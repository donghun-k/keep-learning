import React from 'react';
import { useParams } from 'react-router-dom';

const Video = () => {
  const { keyword } = useParams();
  return <div>Video {keyword}</div>;
};

export default Video;
