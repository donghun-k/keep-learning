import { TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const Test = () => {
  const [name, setName] = useState('');
  return (
    <div>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        type='text'
        placeholder='Name'
        variant='outlined'
      />
      <TextField type='email' placeholder='Email' variant='standard' />
      <TextField type='password' placeholder='Password' variant='filled' />

      <Typography>{name}</Typography>
    </div>
  );
};
export default Test;
