import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const Test = () => {
  const [anchorElm, setAnchorElm] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setAnchorElm(null);
    setOpen(false);
  };

  const handleClick = (e) => {
    setAnchorElm(e.currentTarget);
    setOpen(true);
  };

  return (
    <div>
      <Button variant='contained' onClick={handleClick}>
        Open Menu
      </Button>
      <Button onClick={handleClick}>Open Menu Again</Button>
      <Menu anchorEl={anchorElm} open={open} ocClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Balance</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
export default Test;
