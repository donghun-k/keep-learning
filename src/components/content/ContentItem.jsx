import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';

const ContentItem = ({ title, description, img, swap }) => {
  const isMatch = useMediaQuery(useTheme().breakpoints.down('md'));
  return (
    <Box
      bgcolor={!swap && '#fff'}
      display='flex'
      padding={10}
      flexDirection={isMatch ? 'column' : 'row'}
      justifyContent='space-evenly'
      alignItems='center'
    >
      {swap ? (
        <>
          <Box>
            <Typography
              fontSize={{ lg: 32, md: 28, sm: 24, xs: 20 }}
              color='#734950'
              padding={3}
              variant='h3'
            >
              {title}
            </Typography>
            <Typography
              fontSize={{ lg: 24, md: 20, sm: 16, xs: 12 }}
              padding={3}
              variant='caption'
            >
              {description}
            </Typography>
          </Box>
          <img
            src={img}
            alt={title}
            loading='lazy'
            width='500px'
            height='300px'
            style={{
              boxShadow: '10px 10px 20px #ccc',
              marginLeft: '10%',
              borderRadius: 20,
            }}
          />
        </>
      ) : (
        <>
          <img
            src={img}
            alt={title}
            loading='lazy'
            width='500px'
            height='300px'
            style={{
              boxShadow: '10px 10px 20px #ccc',
              marginRight: '10%',
              borderRadius: 20,
            }}
          />
          <Box>
            <Typography
              fontSize={{ lg: 32, md: 28, sm: 24, xs: 20 }}
              color='#734950'
              padding={3}
              variant='h3'
            >
              {title}
            </Typography>
            <Typography
              fontSize={{ lg: 24, md: 20, sm: 16, xs: 12 }}
              padding={3}
              variant='caption'
            >
              {description}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
export default ContentItem;
