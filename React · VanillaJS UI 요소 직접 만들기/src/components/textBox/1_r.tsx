import { SyntheticEvent, useState } from 'react';
import cx from './cx';

const measureLines = ($el: HTMLTextAreaElement, value: string) => {
  if (!$el || !value) return 0;
  const canvas = document.createElement('canvas');
  const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d')!;
  const style = window.getComputedStyle($el);
  canvasContext.font = `${style.getPropertyValue(
    'font-size'
  )} ${style.getPropertyValue('font-family')}`;
  return value.split('\n').reduce((acc, line) => {
    return (
      acc +
      Math.max(
        Math.ceil(canvasContext.measureText(line).width / $el.offsetWidth),
        1
      )
    );
  }, 0);
};

const TextBox1 = () => {
  const [text, setText] = useState('');
  const [lines, setLines] = useState(3);

  const handleChange = (e: SyntheticEvent) => {
    const $el = e.target as HTMLTextAreaElement;
    const value = $el.value;
    const lines = Math.min(Math.max(measureLines($el, value), 3), 15);
    setText(value);
    setLines(lines);
  };
  return (
    <>
      <h3>
        #1<sub>Controlled</sub>
      </h3>
      <div className={cx('container')}>
        <textarea
          onChange={handleChange}
          className={cx('textarea')}
          rows={lines}
        />
      </div>
    </>
  );
};

export default TextBox1;
