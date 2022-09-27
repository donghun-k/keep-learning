import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Footer = () => {
  return (
    <Box display='flex' flexDirection='column'>
      <Typography variant='h3' paddingTop={10} textAlign='center'>
        Ready For Any Team Size
      </Typography>
      <Typography variant='div' textAlign='center' padding={4}>
        Optimized For Any Team Size
      </Typography>
      <Box display='flex' margin='auto' justifyContent='center' padding={5}>
        <Button sx={{ mr: 2 }} variant='contained'>
          Try CodeEnv For Free
        </Button>
        <Button sx={{ ml: 2 }} variant='outlined'>
          Talk To Sales
        </Button>
      </Box>
    </Box>
  );
};
export default Footer;
