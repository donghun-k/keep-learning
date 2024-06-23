import { stringToDOM } from '@/service/util';
import Modal from './Modal';

export interface AlertModalProps {
  id: string;
  text: string;
}

const AlertModal = ({ id, text }: AlertModalProps) => {
  new Modal({
    id,
    title: 'Alert',
    contentChildren: [stringToDOM(`<p>${text}</p>`)],
    footerButtonProps: [
      {
        text: '확인',
        type: 'button',
        closeOnClick: true,
      },
    ],
  });
};

export default AlertModal;
