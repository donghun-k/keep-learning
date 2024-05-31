import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

const LineClampText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const [isClamped, toggleClamped] = useState(true);

  useEffect(() => {
    if (!text || !textRef.current || !cloneRef.current) return;
    toggleClamped(
      cloneRef.current.offsetHeight /
        parseInt(getComputedStyle(textRef.current).lineHeight) >
        3
    );
  }, [text]);

  return (
    <div className={cx('content', { clamped: isClamped })}>
      <div className={cx('text-clone')} ref={cloneRef}>
        {text}
      </div>
      <div className={cx('text')} ref={textRef} style={{ WebkitLineClamp: 3 }}>
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

const LineClamp2 = () => {
  return (
    <>
      <h3>
        #2. React<sub>Clone - 3줄 말줄임</sub>
      </h3>
      {data.map((text, index) => (
        <LineClampText key={index} text={text} />
      ))}
    </>
  );
};

export default LineClamp2;
