import VanillaWrapper from '@/components/vanillaWrapper';
import { stringToDOM } from '@/service/util';
import AlertModal, { type AlertModalProps } from './AlertModal';
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

const AlertTrigger = ({ id, text }: AlertModalProps) => {
  const $btn = stringToDOM(`<button>Alert</button>`);
  $btn.addEventListener('click', () => AlertModal({ id, text }));
  return $btn;
};

const ConfirmTrigger = ({
  id,
  children,
}: Pick<ConfirmModalProps, 'id' | 'children'>) => {
  const setConfirmed = (flag: boolean) => {
    $btn.textContent = `Confirm 모달 열기 ${flag ? '확인됨' : '확인 안됨'}`;
  };

  const handleConfirm = () => setConfirmed(true);
  const handleCancel = () => setConfirmed(false);

  const $btn = stringToDOM(`<button>Confirm 모달 열기 ${'확인 안됨'}</button>`);
  $btn.addEventListener('click', () => {
    ConfirmModal({
      id,
      title: '주의',
      children,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    });
  });
  return $btn;
};
const initiator = (wrapper: HTMLDivElement) => {
  const template = document.createElement('template');
  template.insertAdjacentHTML(
    'beforeend',
    Array.from({ length: 10 }, () => '<p>____place____holder____</p>').join('')
  );
  wrapper.append(...template.children);

  const alertBtn = AlertTrigger({
    id: 'alert1',
    text: 'This is an alert message.',
  });

  template.insertAdjacentElement('beforeend', alertBtn);

  template.insertAdjacentHTML(
    'beforeend',
    Array.from({ length: 10 }, () => '<p>____place____holder____</p>').join('')
  );
  wrapper.append(...template.children);

  const confirmBtn3 = ConfirmTrigger({
    id: 'confirm3',
    children: [stringToDOM('<p>Are you reallry sure?</p>')],
  });

  const consfirmBtn2 = ConfirmTrigger({
    id: 'confirm2',
    children: [stringToDOM('<p>Really?</p>'), confirmBtn3],
  });

  const confirmBtn1 = ConfirmTrigger({
    id: 'confirm1',
    children: [stringToDOM('<p>Are you sure?</p>'), consfirmBtn2],
  });

  template.insertAdjacentElement('beforeend', confirmBtn1);

  template.insertAdjacentHTML(
    'beforeend',
    Array.from({ length: 10 }, () => '<p>____place____holder____</p>').join('')
  );
  wrapper.append(...template.children);
  wrapper.append(stringToDOM('<div id="modalRoot" />'));
};

const Modal3 = () => (
  <>
    <h2>Modal</h2>
    <VanillaWrapper title="#3" initiator={initiator} />
  </>
);

export default Modal3;
