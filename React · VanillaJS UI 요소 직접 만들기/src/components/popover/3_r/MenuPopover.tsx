import useStyleInView from '@/components/tooltip/useStyleInView';
import cx from '../cx';
import { ForwardedRef, RefObject, forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  id: string;
  close: () => void;
  wrapperRef: RefObject<HTMLButtonElement>;
  dialogRef: RefObject<HTMLDialogElement>;
  opened: boolean;
}

const menuPosition = {
  top: 39,
  bottom: -2,
  left: 5,
  right: 5,
};

const MenuPopover = ({ id, close, wrapperRef, dialogRef, opened }: Props) => {
  const style = useStyleInView(wrapperRef, dialogRef, menuPosition, 'absolute');

  useEffect(() => {
    if (opened) {
      window.addEventListener('click', close);
    }
    return () => {
      window.removeEventListener('click', close);
    };
  }, [opened]);
  return createPortal(
    <dialog
      className={cx('MenuDialog')}
      onClick={(e) => e.stopPropagation()}
      ref={dialogRef}
      style={style}
    >
      <ul className={cx('menus')}>
        <li id={id}>#{id}</li>
        <li>스레드의 댓글</li>
        <li>메시지 전달</li>
        <li>나중을 위해 저장</li>
        <li>읽지 않음으로 표시</li>
        <li>삭제</li>
      </ul>
    </dialog>,
    document.getElementById('popoverRoot') as HTMLElement
  );
};

export default MenuPopover;
