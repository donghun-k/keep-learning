import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import cx from '../cx';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  closeOnClickOutside?: boolean;
  opened: boolean;
  close?: () => void;
}

interface ModalHeaderProps extends PropsWithChildren {
  title?: string;
  close?: () => void;
}
const Modal = ({
  opened,
  close,
  closeOnClickOutside = false,
  children,
}: ModalProps) => {
  const stopPropagation = (e: MouseEvent) => e.stopPropagation();
  return opened
    ? createPortal(
        <div
          className={cx('Modal')}
          onClick={closeOnClickOutside ? close : undefined}
        >
          <div className={cx('inner')} onClick={stopPropagation}>
            {children}
          </div>
        </div>,
        document.getElementById('modalRoot')!
      )
    : null;
};

const ModalHeader = ({ title, children, close }: ModalHeaderProps) => {
  return (
    <div className={cx('ModalHeader')}>
      <div className={cx('title')}>{title}</div>
      {children}
      <button className={cx('close')} onClick={close} />
    </div>
  );
};
const ModalContent = ({ children }: PropsWithChildren) => {
  return <div className={cx('ModalContent')}>{children}</div>;
};
const ModalFooter = ({ children }: PropsWithChildren) => {
  return <div className={cx('ModalFooter')}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
