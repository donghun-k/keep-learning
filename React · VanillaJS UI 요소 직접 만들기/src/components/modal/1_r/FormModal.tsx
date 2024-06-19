import { FormEvent, PropsWithChildren } from 'react';
import Modal from './Modal';
import { useSetModals } from './ModalContext';

export interface Props extends PropsWithChildren {
  id: string;
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
}

const FormModal = ({ id, children, onSubmit, onCancel }: Props) => {
  const { closeModal } = useSetModals();
  const handleClose = () => closeModal(id);

  const formId = `${id}-form`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    onSubmit?.(data);
    handleClose();
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  return (
    <Modal id={id}>
      <Modal.Header close={handleClose} />
      <Modal.Content>
        <form id={formId} onSubmit={handleSubmit}>
          {children}
        </form>
      </Modal.Content>
      <Modal.Footer>
        <button type="submit" form={formId}>
          확인
        </button>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
