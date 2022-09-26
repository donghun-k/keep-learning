import { Api } from '@mui/icons-material';
import { AppBar, Button, Link, Tab, Tabs, Toolbar } from '@mui/material';
import { Box } from '@mui/system';

const links = ['Products', 'Solutions', 'Pricing', 'Enterprise'];

const Header = () => {
  return (
    <AppBar sx={{ bgcolor: 'transparent', boxShadow: 0 }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Api sx={{ color: 'black' }} />
          <Box>
            <Tabs component={Link} sx={{ textDecoration: 'none' }}>
              {links.map((link, index) => (
                <Tab
                  sx={{
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline',
                      textUnderlineOffset: '5px',
                    },
                  }}
                  key={index}
                  label={link}
                />
              ))}
            </Tabs>
          </Box>
          <Box display='flex' marginLeft={'auto'}>
            <Button sx={{ mr: 2 }} variant='outlined'>
              Talk To Us
            </Button>
            <Button sx={{ ml: 2 }} variant='contained'>
              Try For Free
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
