import { stringToDOM } from '@/service/util';
import cx from '../cx';

interface ModalFooterButtonProps {
  text: string;
  type?: 'button' | 'submit';
  formId?: string;
  disabled?: boolean;
  closeOnClick: boolean;
  handleClick?: () => void;
}

interface ModalProps {
  id: string;
  title?: string;
  modalClassName?: string;
  contentClassName?: string;
  headerChildren?: Element[] | [string];
  contentChildren?: Element[] | [string];
  footerChildren?: Element[] | [string];
  footerButtonProps?: ModalFooterButtonProps[];
}

class Modal {
  #el: Element;

  constructor({
    id,
    title = '',
    modalClassName = '',
    contentClassName = '',
    headerChildren = [],
    contentChildren = [],
    footerChildren = [],
    footerButtonProps = [],
  }: ModalProps) {
    const $header = stringToDOM(`
      <div class="${cx('ModalHeader')}">
        <div class="${cx('title')}">${title}</div>
      </div>
    `);
    if (headerChildren) $header.append(...headerChildren);

    const $content = stringToDOM(`
      <div class="${cx('ModalContent', contentClassName)}"></div>
    `);
    if (contentChildren) $content.append(...contentChildren);

    const $footer = stringToDOM(`
      <div class="${cx('ModalFooter')}"></div>
    `);
    const footerButtons = footerButtonProps.map(
      ({
        text,
        type = 'button',
        formId,
        disabled,
        closeOnClick,
        handleClick,
      }) => {
        const $button = stringToDOM(`
        <button type="${type}" form="${formId}" ${
          disabled ? 'disabled' : ''
        }>${text}</button>
      `);
        if (closeOnClick) $button.addEventListener('click', () => this.close());
        if (handleClick) $button.addEventListener('click', handleClick);
        return $button;
      }
    );
    $footer.append(...footerButtons);

    if (footerChildren) $footer.append(...footerChildren);

    const $inner = stringToDOM(`
      <div class="${cx('inner')}"></div>
    `);
    $inner.append($header, $content, $footer);

    const $modal = stringToDOM(`
      <div class="${cx('Modal', modalClassName)}" id="${id}"></div>
    `);
    $modal.append($inner);

    this.#el = $modal;
    document.getElementById('modalRoot')?.append($modal);
  }

  close() {
    this.#el.remove();
  }
}

export default Modal;
