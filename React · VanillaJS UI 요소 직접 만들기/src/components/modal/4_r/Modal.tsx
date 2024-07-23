import { ReactNode, RefObject, SyntheticEvent, useCallback } from 'react';
import cx from '../cx';

const Modal = ({
  modalRef,
  closeOnClickOutside = false,
  children,
  close,
  onClose,
  className,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  closeOnClickOutside?: boolean;
  children: ReactNode;
  close: () => void;
  onClose?: (...arg: any[]) => void;
  className?: string;
}) => {
  const handleClose = () => {
    close();
    onClose?.();
  };

  const handleClick = useCallback(
    (e: SyntheticEvent) => {
      if (closeOnClickOutside && modalRef.current === e.target) {
        handleClose();
      }
    },
    [closeOnClickOutside]
  );

  return (
    <dialog
      className={cx('Dialog', className)}
      ref={modalRef}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
};

const ModalHeader = ({
  title,
  children,
  close,
}: {
  title?: string;
  children?: ReactNode;
  close?: () => void;
}) => {
  return (
    <div className={cx('ModalHeader', 'gModalHeader')}>
      <div className={cx('title')}>{title}</div>
      {children}
      <button className={cx('close', 'gModalClose')} onClick={close} />
    </div>
  );
};

const ModalContent = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cx('ModalContent', className)}>{children}</div>;
};

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className={cx('ModalFooter')}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

/* Compound Component */

export default Modal;
