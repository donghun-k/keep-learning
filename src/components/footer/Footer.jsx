import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Footer = () => {
  return (
    <Box display='flex' flexDirection='column'>
      <Typography
        fontWeight='bold'
        fontSize={{ lg: 30, md: 24, sm: 18, xs: 14 }}
        variant='h3'
        paddingTop={10}
        textAlign='center'
      >
        Ready For Any Team Size
      </Typography>
      <Typography
        fontSize={{ lg: 24, md: 20, sm: 16 }}
        variant='div'
        textAlign='center'
        padding={4}
      >
        Optimized For Any Team Size
      </Typography>
      <Box display='flex' margin='auto' justifyContent='center' padding={5}>
        <Button
          sx={{ mr: 2, fontSize: { lg: 20, md: 17, sm: 12, xs: 8 } }}
          variant='contained'
        >
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
