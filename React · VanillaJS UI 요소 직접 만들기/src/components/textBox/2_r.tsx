import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import cx from './cx';
import { measureLines } from '@/service/util';

const TextBox2 = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const $el = textareaRef.current;
    const handleInput = () => {
      if (!$el) return;
      const value = $el.value;
      const lines = Math.min(Math.max(measureLines($el, value), 3), 15);
      $el.rows = lines;
    };
    if ($el) {
      $el.addEventListener('input', handleInput);
    }
    return () => {
      if ($el) {
        $el.removeEventListener('input', handleInput);
      }
    };
  }, []);
  return (
    <>
      <h3>
        #2. React<sub>Uncontrolled - canvas</sub>
      </h3>
      <div className={cx('container')}>
        <textarea ref={textareaRef} className={cx('textarea')} rows={3} />
      </div>
    </>
  );
};

export default TextBox2;
