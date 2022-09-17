import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const arrOptions = ['Profile', 'Balance', 'Logout'];

const Test = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Box>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
          <List>
            {arrOptions.map((elm) => (
              <ListItemButton onClickCapture={() => setOpen(false)}>
                <ListItemText primary={elm} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};
export default Test;
