import { Box, Typography } from '@mui/material';

const ContentItem = ({ title, description, img, swap }) => {
  return (
    <Box
      bgcolor={!swap && '#fff'}
      display='flex'
      padding={10}
      justifyContent='space-evenly'
      alignItems='center'
    >
      {swap ? (
        <>
          <Box>
            <Typography color='#734950' padding={3} variant='h3'>
              {title}
            </Typography>
            <Typography padding={3} variant='caption'>
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
            <Typography color='#734950' padding={3} variant='h3'>
              {title}
            </Typography>
            <Typography padding={3} variant='caption'>
              {description}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
export default ContentItem;
