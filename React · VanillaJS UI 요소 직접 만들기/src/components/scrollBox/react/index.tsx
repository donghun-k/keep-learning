import { LazyImage } from '@/components/lazyLoading/1_r';
import ScrollBox from './ScrollBox';
import data from '../data';

interface ItemProps {
  id: string;
  description: string;
  imgUrl: string;
}

const Item = ({ id, description, imgUrl }: ItemProps) => {
  return (
    <div>
      <LazyImage src={imgUrl} width={250} height={400} />
      <span>{description}</span>
    </div>
  );
};

const ScrollBox1 = () => {
  return (
    <>
      <h3>#1. React</h3>
      <ScrollBox data={data} Item={Item} />
    </>
  );
};

export default ScrollBox1;
