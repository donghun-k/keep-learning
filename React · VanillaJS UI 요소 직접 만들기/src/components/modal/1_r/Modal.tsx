import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import cx from '../cx';
import { useSetModals } from './ModalContext';

interface ModalProps extends PropsWithChildren {
  id: string;
  closeOnClickOutside?: boolean;
}

interface ModalHeaderProps extends PropsWithChildren {
  title?: string;
  close?: () => void;
}
const Modal = ({ id, closeOnClickOutside = false, children }: ModalProps) => {
  const { closeModal } = useSetModals();
  const handleClose = () => closeModal(id);
  const stopPropagation = (e: MouseEvent) => e.stopPropagation();
  return (
    <div
      className={cx('Modal')}
      onClick={closeOnClickOutside ? handleClose : undefined}
    >
      <div className={cx('inner')} onClick={stopPropagation}>
        {children}
      </div>
    </div>
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
