import VanillaWrapper from '@/components/vanillaWrapper';
import vanillaScrollBox from './scrollBox';

const initiator = (wrapper: HTMLElement) => {
  const $scrollBox = vanillaScrollBox();
  wrapper.append($scrollBox);
};

const ScrollBox2 = () => <VanillaWrapper title="#2" initiator={initiator} />;

export default ScrollBox2;
