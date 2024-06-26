import { MouseEvent, PropsWithChildren, ReactNode, RefObject } from 'react';
import cx from '../cx';

interface ModalProps extends PropsWithChildren {
  modalRef: RefObject<HTMLDialogElement>;
  closeOnClickOutside?: boolean;
  close?: () => void;
}

interface ModalHeaderProps extends PropsWithChildren {
  title?: string;
  close?: () => void;
}
const Modal = ({
  modalRef,
  close,
  closeOnClickOutside = false,
  children,
}: ModalProps) => {
  return (
    <dialog
      className={cx('Dialog')}
      onClick={closeOnClickOutside ? close : undefined}
      ref={modalRef}
    >
      {children}
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
