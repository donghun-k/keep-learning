import React, { MouseEvent, use, useRef, useState } from 'react';
import cx from '../cx';
import useInfiniteScroll from '@/components/infiniteScroll/react/useInfiniteScroll';
import MenuPopover from './MenuPopover';
import ViewportContextProvider from '@/context/viewportContext';

interface ListItemProps {
  id: string;
  title: string;
  index: number;
}

const ListItem = ({ id, title, index }: ListItemProps) => {
  const [opened, setOpened] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dialogRef.current?.show();
    setOpened(true);
  };
  const closeMenu = () => {
    dialogRef.current?.close();
    setOpened(false);
  };

  return (
    <li className={cx('list-item')} id={id}>
      <p>
        #{index + 1}. {title}
      </p>
      <button
        className={cx('popover-button')}
        onClick={handleClickButton}
        ref={buttonRef}
      />
      <MenuPopover
        id={index + 1 + ''}
        close={closeMenu}
        wrapperRef={buttonRef}
        dialogRef={dialogRef}
        opened={opened}
      />
    </li>
  );
};

const Popover3 = () => {
  const { data, state, moreRef } = useInfiniteScroll();
  return (
    <ViewportContextProvider>
      <div className={cx('Popovers')}>
        <h2>
          #3. <sub>HTML Dialog</sub>
        </h2>
        <ul className={cx('list')}>
          {data.map((page, i) =>
            page.map((item, j) => <ListItem {...item} key={i + j} />)
          )}
          <div ref={moreRef} />
          {state === 'loading' && <div>Loading...</div>}
        </ul>
      </div>
      <div id="popoverRoot" />
    </ViewportContextProvider>
  );
};

export default Popover3;
