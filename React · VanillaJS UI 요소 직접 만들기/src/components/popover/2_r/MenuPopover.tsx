import useStyleInView from '@/components/tooltip/useStyleInView';
import cx from '../cx';
import { RefObject, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  id: string;
  close: () => void;
  wrapperRef: RefObject<HTMLButtonElement>;
}

const menuPosition = {
  top: 39,
  bottom: -2,
  left: 5,
  right: 5,
};

const MenuPopover = ({ id, close, wrapperRef }: Props) => {
  const targetRef = useRef<HTMLUListElement>(null);
  const style = useStyleInView(wrapperRef, targetRef, menuPosition, 'absolute');
  return createPortal(
    <div className={cx('MenuPopover')} onClick={close}>
      <ul
        className={cx('menus')}
        onClick={(e) => e.stopPropagation()}
        ref={targetRef}
        style={style}
      >
        <li id={id}>#{id}</li>
        <li>스레드의 댓글</li>
        <li>메시지 전달</li>
        <li>나중을 위해 저장</li>
        <li>읽지 않음으로 표시</li>
        <li>삭제</li>
      </ul>
    </div>,
    document.getElementById('popoverRoot') as HTMLElement
  );
};

export default MenuPopover;
