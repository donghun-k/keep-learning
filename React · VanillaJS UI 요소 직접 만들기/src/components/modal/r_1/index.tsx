import { ReactNode, useState } from 'react';

const AlertTrigger = ({ id, text }: { id: string; text: string }) => {
  const { openModal } = useSetModals();

  const openAlertModal = () => {
    openModal(id, <AlertModal id={id} text={text} />);
  };
  return <button onClick={openAlertModal}>얼럿 띄우기</button>;
};

const ConfirmTrigger = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { openModal, closeModal } = useSetModals();
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const closeThis = () => closeModal(id);

  const openConfirmModal = () => {
    openModal(
      id,
      <ConfirmModal
        id={id}
        confirmed={confirmed}
        onConfirm={() => {
          setConfirmed(true);
          closeThis();
        }}
        onCancel={() => {
          setConfirmed(false);
          closeThis();
        }}
        hide={closeThis}
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

const FormTrigger = ({ id }: { id: string }) => {
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
    <>
      <h2>모달</h2>
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
      <AlertTrigger id="2" text="2번 경고입니다. 주의하세욧!" />
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
          <p>정말 진행하시겠습니까?</p>
          <p>중첩해서 모달 띄우기</p>
          <p>중첩해서 모달 띄우기</p>
          <p>중첩해서 모달 띄우기</p>
          <ConfirmTrigger id="5">
            <>
              <p>이건 이런 문제가 있는데, 정말 진행합니까?</p>
              <p>중첩해서 모달 띄우기</p>
              <p>중첩해서 모달 띄우기</p>
              <ConfirmTrigger id="6">
                <p>이건 문제가 있는데, 정말 진행합니까?</p>
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
    </>
  );
};

export default Modal1;
