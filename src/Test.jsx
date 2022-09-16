import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';

const Test = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box position='absolute' top='50%' left='50%'>
          <Typography>It is a Modal!</Typography>
          <Button variant='contained' onClick={() => setOpen(false)}>
            Click Me
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default Test;
