import VanillaWrapper from '@/components/vanillaWrapper';
import cx from '../cx';
import data from '../data';
import lazyLoad from './lazyLoad';

interface LazyImageProps {
  src: string;
  width: number;
  height: number;
}

export const lazyImageBuilder = ({ src, width, height }: LazyImageProps) => {
  const $el = document.createElement('img');
  $el.classList.add(cx('lazy'));
  $el.setAttribute('width', width + 'px');
  $el.setAttribute('height', height + 'px');
  const onLoad = () => {
    $el.classList.remove(cx('lazy'));
  };

  $el.addEventListener('load', onLoad, { once: true });

  lazyLoad({ $el, src });
  return $el;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $imgs = data.map((src) =>
    lazyImageBuilder({ src, width: 600, height: 320 })
  );
  wrapper.append(...$imgs);
};

const LazyLoading2 = () => (
  <>
    <h2>
      지연 로딩<sub>Vanilla</sub>
    </h2>
    <VanillaWrapper initiator={initiator} />
  </>
);

export default LazyLoading2;
