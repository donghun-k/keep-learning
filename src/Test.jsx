import { Box, Typography, useTheme } from '@mui/material';

const Test = () => {
  const theme = useTheme();
  console.log(theme);

  return (
    <div>
      <Box>
        <Typography variant='h1' color='primary'>
          Hello
        </Typography>
      </Box>
    </div>
  );
};
export default Test;
