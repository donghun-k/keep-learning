import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const Test = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography>LOGO</Typography>
          <Button
            variant='contained'
            sx={{ marginLeft: 'auto' }}
            color='warning'
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Test;
