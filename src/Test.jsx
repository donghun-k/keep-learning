import React from 'react';
import { Typography } from '@mui/material';

const Test = () => {
  return (
    <div>
      <Typography
        variant='h1'
        sx={{ color: 'red', border: '1px solid black', borderRadius: 10 }}
      >
        Hello, world!
      </Typography>
    </div>
  );
};
export default Test;
