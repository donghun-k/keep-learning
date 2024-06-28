import { RefObject } from 'react';
import Modal from './Modal';

export interface Props {
  modalRef: RefObject<HTMLDialogElement>;
  text: string;
  close: () => void;
  closeOnClickOutside?: boolean;
}

const AlertModal = ({ modalRef, text, close, closeOnClickOutside }: Props) => {
  return (
    <Modal modalRef={modalRef} close={close} closeOnClickOutside>
      <Modal.Content>{text}</Modal.Content>
      <Modal.Footer>
        <button onClick={close}>확인</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
