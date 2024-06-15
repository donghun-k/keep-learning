import { AnimationEvent, useEffect, useRef, useState } from 'react';
import cx from '../cx';
import { Snackbar, useSetSnackbar, useSnackbar } from './SnackbarContext';

const SnackbarItem = ({
  id,
  isOpen,
  children,
  onMouseEnter,
  onMouseLeave,
}: Snackbar) => {
  const { removeSnackbar } = useSetSnackbar();
  const elRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string[]>([]);

  const handleAnimationEnd = (e: AnimationEvent) => {
    if (elRef.current?.className.includes('enter'))
      setAnimationClassName(['show']);
    else {
      removeSnackbar(id);
    }
  };

  useEffect(() => {
    setAnimationClassName(isOpen ? ['enter'] : ['show', 'exit']);
  }, [isOpen]);

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

const SnackbarRoot = () => {
  const snackbars = useSnackbar();
  return (
    <div className={cx('Snackbars')}>
      {snackbars.map((snackbar) => (
        <SnackbarItem key={snackbar.id} {...snackbar} />
      ))}
    </div>
  );
};

export default SnackbarRoot;
