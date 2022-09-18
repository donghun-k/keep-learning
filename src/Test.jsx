import { Box, Rating, Typography } from '@mui/material';
import { useState } from 'react';

const Test = () => {
  const [value, setValue] = useState();
  return (
    <div>
      <Box>
        <Rating
          precision={0.5}
          defaultChecked={2.5}
          value={value}
          size='large'
          onChange={(e, val) => setValue(val)}
        />
        <Typography>Rated {value !== undefined ? value : 0} Stars</Typography>
      </Box>
    </div>
  );
};
export default Test;
