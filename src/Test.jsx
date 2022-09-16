import { Container } from '@mui/system';

const Test = () => {
  return (
    <div>
      <Container sx={{ background: 'pink' }} maxWidth='xs'>
        This is XS
      </Container>
      <Container sx={{ background: 'pink' }} maxWidth='sm'>
        This is SM
      </Container>
      <Container sx={{ background: 'pink' }} maxWidth='md'>
        This is MD
      </Container>
      <Container sx={{ background: 'pink' }} maxWidth='lg'>
        This is LG
      </Container>
      <Container sx={{ background: 'pink' }} maxWidth='xl'>
        This is XL
      </Container>
    </div>
  );
};
export default Test;
