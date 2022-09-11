import React from 'react';
import { Button } from '@mui/material';

const Test = () => {
  return (
    <div>
      <Button
        onClick={() => {
          alert('Button Clicked!');
        }}
        color='success'
        size='large'
        variant='contained'
      >
        First
      </Button>
      <Button color='error' size='medium' variant='outlined'>
        Second
      </Button>
      <Button color='info' size='small' variant='text'>
        Third
      </Button>
    </div>
  );
};
export default Test;
