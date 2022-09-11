import { Button, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const Test = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name='name'
          value={inputs.name}
          onChange={handleChange}
          type='text'
          placeholder='Name'
          variant='outlined'
        />
        <TextField
          name='email'
          value={inputs.email}
          onChange={handleChange}
          type='email'
          placeholder='Email'
          variant='standard'
        />
        <TextField
          name='password'
          value={inputs.password}
          onChange={handleChange}
          type='password'
          placeholder='Password'
          variant='filled'
        />
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
};
export default Test;
