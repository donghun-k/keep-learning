import Modal from './Modal';

export interface ConfirmModalProps {
  id: string;
  title: string;
  children?: Element[] | [string];
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  id,
  title,
  children,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return new Modal({
    id,
    title,
    contentChildren: children,
    footerButtonProps: [
      {
        text: '확인',
        type: 'button',
        closeOnClick: true,
        handleClick: onConfirm,
      },
      {
        text: '취소',
        type: 'button',
        closeOnClick: true,
        handleClick: onCancel,
      },
    ],
  });
};

export default ConfirmModal;
