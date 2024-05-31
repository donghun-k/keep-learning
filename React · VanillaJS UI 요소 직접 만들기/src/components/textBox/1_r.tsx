import { SyntheticEvent, useState } from 'react';
import cx from './cx';
import { measureLines } from '@/service/util';

const TextBox1 = () => {
  const [lines, setLines] = useState(3);

  const handleChange = (e: SyntheticEvent) => {
    const $el = e.target as HTMLTextAreaElement;
    const value = $el.value;
    const lines = Math.min(Math.max(measureLines($el, value), 3), 15);
    setLines(lines);
  };
  return (
    <>
      <h3>
        #1. React<sub>Controlled</sub>
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
