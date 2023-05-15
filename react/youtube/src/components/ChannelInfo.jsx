import React from 'react';
import { useYoutubeApi } from '../contexts/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

const ChannelInfo = ({ id, name }) => {
  const { youtube } = useYoutubeApi();
  const {
    // error,
    // isLoading,
    data: url,
  } = useQuery(['channel', id], () => youtube.getChannelImageURL(id));
  return (
    <div>
      {url && <img src={url} alt={name} />}
      <p>{name}</p>
    </div>
  );
};

export default ChannelInfo;
