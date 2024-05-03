import { measureLines } from '@/service/util';
import VanillaWrapper from '../vanillaWrapper';
import cx from './cx';

const initiator = ($wrapper: HTMLElement) => {
  const $text = document.createElement('textarea');
  $text.classList.add(cx('textarea'));
  $text.rows = 3;

  const handleInput = () => {
    const value = $text.value;
    const lines = Math.min(Math.max(measureLines($text, value), 3), 15);
    $text.rows = lines;
  };

  $text.addEventListener('input', handleInput);

  const $container = document.createElement('div');
  $container.classList.add(cx('container'));
  $container.appendChild($text);
  $wrapper.appendChild($container);
};

const TextBox4 = () => <VanillaWrapper title="#4" initiator={initiator} />;

export default TextBox4;
