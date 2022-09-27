import { Box } from '@mui/material';
import ContentItem from './ContentItem';

const contentArray = [
  {
    title: 'Get Things Done',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    img: '/1.jpg',
  },
  {
    title: 'Productivity Is Brilliant',
    description:
      'Veritatis ea obcaecati, sunt illo accusamus reiciendis iusto dolores corrupti.',
    img: '/2.jpg',
  },
  {
    title: 'Fast Development',
    description:
      'Similique vitae ex sequi vero adipisci eveniet libero vel rerum laudantium. Dignissimos.',
    img: '/3.jpg',
  },
];

const Content = () => {
  return (
    <Box
      bgcolor='#fbf2f2'
      display='flex'
      justifyContent='center'
      flexDirection='column'
      width='100%'
      height='100%'
    >
      {contentArray.map((content, index) => (
        <ContentItem
          title={content.title}
          description={content.description}
          img={content.img}
          key={index}
        />
      ))}
    </Box>
  );
};
export default Content;
