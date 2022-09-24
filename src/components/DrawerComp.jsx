import { MenuRounded } from '@mui/icons-material';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

const DrawerComp = ({ links }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        PaperProps={{ sx: { backgroundColor: 'pink' } }}
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {links.map((link, e) => (
            <ListItemButton onClick={() => setOpen(false)} key={e} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: 'white' }}>{link}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <IconButton
        sx={{ marginLeft: 'auto', color: 'white' }}
        onClick={() => setOpen(true)}
      >
        <MenuRounded />
      </IconButton>
    </>
  );
};
export default DrawerComp;
