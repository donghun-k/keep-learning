import { useState } from 'react';
import AlertModal, { Props as AlertModalProps } from './AlertModal';
import ConfirmModal, { Props as ConfrimModalProps } from './ConfirmModal';
import FormModal, { Props as FormModalProps } from './FormModal';
import useModal from './useModal';
import ModalRoot from './ModalRoot';

const AlertTrigger = ({ text }: Pick<AlertModalProps, 'text'>) => {
  const { opened, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>얼럿 띄우기</button>
      <AlertModal opened={opened} text={text} close={closeModal} />
    </>
  );
};

const ConfirmTrigger = ({ children }: Pick<ConfrimModalProps, 'children'>) => {
  const { opened, openModal, closeModal } = useModal();
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  return (
    <>
      <button onClick={openModal}>
        확인 모달 열기 {confirmed ? '확인 됨' : '확인 안됨'}
      </button>
      <ConfirmModal
        opened={opened}
        onConfirm={() => {
          setConfirmed(true);
          closeModal();
        }}
        onCancel={() => {
          setConfirmed(false);
          closeModal();
        }}
        close={closeModal}
      >
        {children}
      </ConfirmModal>
    </>
  );
};

const FormTrigger = ({ id }: Pick<FormModalProps, 'id'>) => {
  const { opened, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>폼 모달 열기</button>
      <FormModal
        id={id}
        opened={opened}
        onSubmit={(d) => {
          console.log(Array.from(d));
        }}
        close={closeModal}
      >
        <input name="name" placeholder="상품명" />
        <input name="price" type="number" placeholder="가격" />
        <label>
          <input name="soldOut" type="checkbox" /> 품절
        </label>
      </FormModal>
    </>
  );
};

const Modal2 = () => {
  return (
    <>
      <h2>Modal</h2>
      <h3>
        #2. React<sub>Portal</sub>
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
      <AlertTrigger text="1번 경고입니다. 아무튼 경고예요." />
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <AlertTrigger text="2번 경고입니다. 주의하세요. 진짜." />
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <p>____place____holder____</p>
      <ConfirmTrigger>
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
      <ConfirmTrigger>
        <>
          <p>문제가 발생할 수도 있습니다. 정말 진행하시겠습니까?</p>
          <ConfirmTrigger>
            <>
              <p>정말로 진행하시겠습니까?</p>
              <p>무슨 문제 생겨도 책임지지 않습니다.</p>
              <ConfirmTrigger>
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
      <FormTrigger id="A" />
      <ModalRoot />
    </>
  );
};

export default Modal2;
