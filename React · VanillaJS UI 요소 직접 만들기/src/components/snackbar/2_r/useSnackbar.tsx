import {
  Dispatch,
  EventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import SnackbarItem from './SnackbarItem';

const SNACKBAR_DURATION = 3000;

type SnackbarStatus = 'open' | 'close' | null;

export interface Snackbar {
  children: ReactNode;
  status: SnackbarStatus;
  setStatus: Dispatch<SetStateAction<SnackbarStatus>>;
  onMouseEnter?: EventHandler<any>;
  onMouseLeave?: EventHandler<any>;
}

const useSnackbar = (children: ReactNode) => {
  const timeoutId = useRef<number | null>(null);
  const [status, setStatus] = useState<SnackbarStatus>(null);

  const openSnackbar = useCallback(() => {
    setStatus('open');
    timeoutId.current = window.setTimeout(() => {
      setStatus('close');
    }, SNACKBAR_DURATION);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current);
    }
  };
  const handleMouseLeave = () => {
    timeoutId.current = window.setTimeout(() => {
      setStatus('close');
    }, SNACKBAR_DURATION);
  };

  return {
    snackbar: !!status
      ? createPortal(
          <SnackbarItem
            status={status}
            setStatus={setStatus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </SnackbarItem>,
          document.getElementById('snackbarRoot') as HTMLElement
        )
      : null,
    open: openSnackbar,
  };
};

export default useSnackbar;
