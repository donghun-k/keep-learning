import { Api } from '@mui/icons-material';
import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';

const Header = () => {
  return (
    <AppBar sx={{ bgcolor: 'transparent', boxShadow: 0 }}>
      <Toolbar>
        <Box>
          <Api sx={{ color: 'black' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
