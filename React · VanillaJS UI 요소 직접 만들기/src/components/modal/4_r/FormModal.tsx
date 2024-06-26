import { FormEvent, PropsWithChildren, RefObject } from 'react';
import Modal from './Modal';

export interface Props extends PropsWithChildren {
  id: string;
  modalRef: RefObject<HTMLDialogElement>;
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
  close: () => void;
}

const FormModal = ({
  id,
  modalRef,
  children,
  onSubmit,
  onCancel,
  close,
}: Props) => {
  const formId = `${id}-form`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    onSubmit?.(data);
    close();
  };

  const handleCancel = () => {
    onCancel?.();
    close();
  };

  return (
    <Modal modalRef={modalRef}>
      <Modal.Header close={close} />
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
