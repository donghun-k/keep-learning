import React from 'react';

const VideoCard = ({ video }) => {
  return <div>{video.snippet.title}</div>;
};

export default VideoCard;
