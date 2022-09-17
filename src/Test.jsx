import { Alert } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const Test = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <Box>
        {show && (
          <Alert onClose={() => setShow(false)} severity='error'>
            This is an Error Alert
          </Alert>
        )}
      </Box>
    </div>
  );
};
export default Test;
