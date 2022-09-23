import { Box, Grid } from '@mui/material';

const Test = () => {
  return (
    <div>
      <Box>
        <Grid container spacing={0}>
          <Grid
            sx={{ background: 'lightyellow' }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={4}
          >
            Item 1
          </Grid>
          <Grid
            sx={{ background: 'lightpink' }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={8}
          >
            Item 2
          </Grid>
          <Grid
            sx={{ background: 'lightblue' }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={8}
          >
            Item 3
          </Grid>
          <Grid
            sx={{ background: 'lightgreen' }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={4}
          >
            Item 4
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default Test;
