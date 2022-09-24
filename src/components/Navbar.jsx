import { useTheme } from '@emotion/react';
import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import DrawerComp from './DrawerComp';

const Navbar = ({ links }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState();
  return (
    <>
      <AppBar>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography>
                <ShoppingCart />
              </Typography>
              <DrawerComp links={links} />
            </>
          ) : (
            <Grid container sx={{ placeItems: 'center' }}>
              <Grid item xs={2}>
                <Typography>
                  <ShoppingCart />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Tabs
                  textColor='inherit'
                  indicatorColor='secondary'
                  value={value}
                  onChange={(e, val) => setValue(val)}
                >
                  {links.map((link, i) => (
                    <Tab key={i} label={link} />
                  ))}
                </Tabs>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={3}>
                <Box>
                  <Button sx={{ marginLeft: 'auto' }} variant='contained'>
                    Login
                  </Button>
                  <Button sx={{ marginLeft: 1 }} variant='contained'>
                    Signup
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
