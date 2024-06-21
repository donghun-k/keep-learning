import { PropsWithChildren } from 'react';
import Modal from './Modal';

export interface Props extends PropsWithChildren {
  opened: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  close: () => void;
}

const ConfirmModal = ({
  opened,
  children,
  onConfirm,
  onCancel,
  close,
}: Props) => {
  return (
    <Modal opened={opened} closeOnClickOutside>
      <Modal.Header title="주의" close={close} />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
