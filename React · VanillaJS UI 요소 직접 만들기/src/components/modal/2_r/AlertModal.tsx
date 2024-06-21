import Modal from './Modal';

export interface Props {
  opened: boolean;
  text: string;
  close: () => void;
}

const AlertModal = ({ opened, text, close }: Props) => {
  return (
    <Modal opened={opened} close={close}>
      <Modal.Content>{text}</Modal.Content>
      <Modal.Footer>
        <button onClick={close}>확인</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
