import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import cx from './cx';

const TextBox3 = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cloneRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const $el = textareaRef.current;
    const $clone = cloneRef.current;
    if (!$el || !$clone) return;
    const handleInput = () => {
      $clone.value = $el.value;
      $el.rows = Math.min(
        Math.max(Math.ceil($clone.scrollHeight / $clone.clientHeight), 3),
        15
      );
    };
    $el.addEventListener('input', handleInput);
    return () => {
      $el.removeEventListener('input', handleInput);
    };
  }, []);
  return (
    <>
      <h3>
        #3. React<sub>Uncontrolled - Clone element</sub>
      </h3>
      <div className={cx('container')}>
        <textarea ref={cloneRef} className={cx('clone')} rows={1} readOnly />
        <textarea ref={textareaRef} className={cx('textarea')} rows={3} />
      </div>
    </>
  );
};

export default TextBox3;
