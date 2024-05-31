import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import { measureLines } from '@/service/util';

const LineClampText = ({ text }: { text: string }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [isClamped, toggleClamped] = useState(true);

  useEffect(() => {
    if (!text || !elRef.current) return;
    const measuredLines = measureLines(elRef.current, text);
    toggleClamped(measuredLines > 3);
  }, [text]);

  return (
    <div className={cx('content', { clamped: isClamped })}>
      <div className={cx('text')} ref={elRef} style={{ WebkitLineClamp: 3 }}>
        {text}
      </div>
      {isClamped && (
        <button
          className={cx('buttonMore')}
          onClick={() => {
            toggleClamped(false);
          }}
        />
      )}
    </div>
  );
};

const LineClamp1 = () => {
  return (
    <>
      <h3>
        #1. React<sub>canvas - 3줄 말줄임</sub>
      </h3>
      {data.map((text, index) => (
        <LineClampText key={index} text={text} />
      ))}
    </>
  );
};

export default LineClamp1;
