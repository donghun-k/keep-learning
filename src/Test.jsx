import { AccountCircle, ArrowCircleDown } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';

const Test = () => {
  return (
    <div>
      <Box>
        <AppBar>
          <Toolbar>
            <IconButton
              onClick={() => {
                alert('Icon Selected!');
              }}
            >
              <AccountCircle />
            </IconButton>
            <IconButton>
              <ArrowCircleDown color='secondary' />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
export default Test;
