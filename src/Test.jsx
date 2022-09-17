import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

const array = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

const Test = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Box>
        <ListItem divider>
          <ListItemButton onClick={() => setOpen(true)}>
            <ListItemIcon>{'>'}</ListItemIcon>
            <ListItemText primary={'Expand List'} />
          </ListItemButton>
        </ListItem>
        <Collapse in={open}>
          <List sx={{ marginLeft: '2rem' }}>
            {array.map((listElm) => (
              <ListItem divider>
                <ListItemButton onClick={() => setOpen(false)}>
                  <ListItemText primary={listElm} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>
    </div>
  );
};
export default Test;
