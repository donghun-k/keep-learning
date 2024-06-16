import { AnimationEvent, useEffect, useRef, useState } from 'react';
import { Snackbar } from './useSnackbar';
import cx from '../cx';

const SnackbarItem = ({
  status,
  setStatus,
  children,
  onMouseEnter,
  onMouseLeave,
}: Snackbar) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string[]>([]);

  const handleAnimationEnd = (e: AnimationEvent) => {
    if (elRef.current?.className.includes('enter'))
      setAnimationClassName(['show']);
    else {
      setStatus(null);
    }
  };

  useEffect(() => {
    setAnimationClassName(status === 'open' ? ['enter'] : ['show', 'exit']);
  }, [status]);

  return (
    <div
      ref={elRef}
      className={cx('SnackbarItem', ...animationClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default SnackbarItem;
