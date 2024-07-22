import {
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useCallback,
} from 'react';
import cx from '../cx';

interface ModalProps extends PropsWithChildren {
  modalRef: RefObject<HTMLDialogElement>;
  closeOnClickOutside?: boolean;
  close?: () => void;
  onClose?: () => void;
  className?: string;
}

interface ModalHeaderProps extends PropsWithChildren {
  title?: string;
  close?: () => void;
}
const Modal = ({
  modalRef,
  close,
  onClose,
  closeOnClickOutside = false,
  children,
  className,
}: ModalProps) => {
  const handleClose = () => {
    close?.();
    onClose?.();
  };

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (closeOnClickOutside && modalRef.current === e.target) {
        handleClose();
      }
    },
    [closeOnClickOutside, close]
  );
  return (
    <dialog
      className={cx('Dialog', className)}
      onClick={handleClick}
      ref={modalRef}
    >
      <div className={cx('inner')}>{children}</div>
    </dialog>
  );
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
const ModalContent = ({
  children,
  className,
}: { className?: string } & PropsWithChildren) => {
  return <div className={cx('ModalContent', className)}>{children}</div>;
};
const ModalFooter = ({ children }: PropsWithChildren) => {
  return <div className={cx('ModalFooter')}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
