import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { Fragment } from 'react';
import { useState } from 'react';

const DrawerComp = ({ links }) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {links.map((link) => (
          <List>
            <ListItemButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <ListItemText>{link}</ListItemText>
            </ListItemButton>
          </List>
        ))}
      </Drawer>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        sx={{ ml: 'auto' }}
      >
        <Menu />
      </IconButton>
    </Fragment>
  );
};
export default DrawerComp;
