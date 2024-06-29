import useStyleView from '@/components/tooltip/useStyleInView';
import cx from '../cx';
import { RefObject, useRef } from 'react';

interface Props {
  id: string;
  close: () => void;
  wrapperRef: RefObject<HTMLButtonElement>;
}

const menuPosition = {
  top: 39,
  bottom: 'calc(100% - 5px)',
  left: 5,
  right: 5,
};

const MenuPopover = ({ id, close, wrapperRef }: Props) => {
  const targetRef = useRef<HTMLUListElement>(null);
  const style = useStyleView(wrapperRef, targetRef, menuPosition);
  return (
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
    </div>
  );
};

export default MenuPopover;
