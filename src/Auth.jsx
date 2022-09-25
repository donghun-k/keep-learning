import { HowToRegOutlined, LoginOutlined } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
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

  const resetState = () => {
    setIsSignup(!isSignup);
    setInputs({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display='flex'
          flexDirection='column'
          maxWidth={400}
          alignItems='center'
          justifyContent='center'
          margin='auto'
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow='5px 5px 10px #ccc'
          sx={{
            ':hover': {
              boxShadow: '10px 10px 20px #ccc',
            },
          }}
        >
          <Typography variant='h2' padding={3} textAlign='center'>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Typography>

          {isSignup && (
            <TextField
              onChange={handleChange}
              name='name'
              value={inputs.name}
              margin='normal'
              type='text'
              variant='outlined'
              placeholder='Name'
            />
          )}
          <TextField
            onChange={handleChange}
            name='email'
            value={inputs.email}
            margin='normal'
            type='email'
            variant='outlined'
            placeholder='Email'
          />
          <TextField
            onChange={handleChange}
            name='password'
            value={inputs.password}
            margin='normal'
            type='password'
            variant='outlined'
            placeholder='Password'
          />
          <Button
            endIcon={isSignup ? <HowToRegOutlined /> : <LoginOutlined />}
            type='submit'
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant='contained'
          >
            {isSignup ? 'Sign up' : 'Sign in'}
          </Button>
          <Button onClick={resetState} sx={{ marginTop: 3 }}>
            Change to {isSignup ? 'Sign In' : 'Sign up'}
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default Auth;
