import Modal from './Modal';
import { useSetModals } from './ModalContext';

export interface Props {
  id: string;
  text: string;
}

const AlertModal = ({ id, text }: Props) => {
  const { closeModal } = useSetModals();
  const handleClose = () => closeModal(id);
  return (
    <Modal id={id}>
      <Modal.Content>{text}</Modal.Content>
      <Modal.Footer>
        <button onClick={handleClose}>확인</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
