import { useState } from 'react';
import { ModalContextProvider, useSetModals } from './ModalContext';
import AlertModal, { Props as AlertModalProps } from './AlertModal';
import ConfirmModal, { Props as ConfrimModalProps } from './ConfirmModal';
import FormModal, { Props as FormModalProps } from './FormModal';

const AlertTrigger = ({ id, text }: AlertModalProps) => {
  const { openModal } = useSetModals();

  const openAlertModal = () => {
    openModal(id, <AlertModal id={id} text={text} />);
  };
  return <button onClick={openAlertModal}>얼럿 띄우기</button>;
};

const ConfirmTrigger = ({
  id,
  children,
}: Pick<ConfrimModalProps, 'id' | 'children'>) => {
  const { openModal, closeModal } = useSetModals();
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const handleClose = () => closeModal(id);

  const openConfirmModal = () => {
    openModal(
      id,
      <ConfirmModal
        id={id}
        onConfirm={() => {
          setConfirmed(true);
          handleClose();
        }}
        onCancel={() => {
          setConfirmed(false);
          handleClose();
        }}
        close={handleClose}
      >
        {children}
      </ConfirmModal>
    );
  };
  return (
    <button onClick={openConfirmModal}>
      확인 모달 열기 {confirmed ? '확인 됨' : '확인 안됨'}
    </button>
  );
};

const FormTrigger = ({ id }: Pick<FormModalProps, 'id'>) => {
  const { openModal } = useSetModals();
  const openFormModal = () => {
    openModal(
      id,
      <FormModal
        id={id}
        onSubmit={(d) => {
          console.log(Array.from(d));
        }}
      >
        <input name="name" placeholder="상품명" />
        <input name="price" type="number" placeholder="가격" />
        <label>
          <input name="soldOut" type="checkbox" /> 품절
        </label>
      </FormModal>
    );
  };
  return <button onClick={openFormModal}>폼 모달 열기</button>;
};

const Modal1 = () => {
  return (
    <ModalContextProvider>
      <h2>Modal</h2>
      <h3>
        #1. React<sub>Context</sub>
      </h3>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <AlertTrigger id="1" text="1번 경고입니다. 아무튼 경고예요." />
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <AlertTrigger id="2" text="2번 경고입니다. 주의하세요. 진짜." />
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <ConfirmTrigger id="3">
        <p>정말 진행하시겠습니까?</p>
      </ConfirmTrigger>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <ConfirmTrigger id="4">
        <>
          <p>문제가 발생할 수도 있습니다. 정말 진행하시겠습니까?</p>
          <ConfirmTrigger id="5">
            <>
              <p>정말로 진행하시겠습니까?</p>
              <p>무슨 문제 생겨도 책임지지 않습니다.</p>
              <ConfirmTrigger id="6">
                <p>한 번만 더 묻습니다.</p>
                <p>후회 안할 자신 있습니까?</p>
                <p>진짜로 합니다?</p>
              </ConfirmTrigger>
            </>
          </ConfirmTrigger>
        </>
      </ConfirmTrigger>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <FormTrigger id="7" />
    </ModalContextProvider>
  );
};

export default Modal1;
