import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const Test = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Tabs
            indicatorColor='inherit'
            textColor='inherit'
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab label='First' />
            <Tab label='Second' />
            <Tab label='Third' />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Test;
