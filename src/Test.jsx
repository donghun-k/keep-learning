import { Box, styled, Typography } from '@mui/material';

const CustomizedTypography = styled(Typography)`
  color: #000055;
  :hover {
    color: #75125c;
    background: #afafaf;
  }
`;

const Test = () => {
  return (
    <div>
      <Box>
        <CustomizedTypography variant='h1'>Hello World</CustomizedTypography>
      </Box>
    </div>
  );
};
export default Test;
