import { Alert, Box, Snackbar } from '@mui/material';
import { useState } from 'react';

const Test = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Box>
        <Snackbar
          onClose={() => setOpen(false)}
          autoHideDuration={2000}
          open={open}
          // message='This is a snackbar'
        >
          <Alert severity='success'>This is a success message!</Alert>
        </Snackbar>
      </Box>
    </div>
  );
};
export default Test;
