import { generateDOM } from '@/service/util';
import cx from '../cx';

const SNACKBAR_DURATION = 3000;

const buildCX = (classNames: string) => classNames.split(' ').map((c) => cx(c));

const initSnackbar = (children: HTMLElement) => {
  let timeoutId: number | null = null;

  const $snackbar = generateDOM('div', cx('SnackbarItem'));
  $snackbar.append(children);

  const toggleClass = ({ add, remove }: { add?: string; remove?: string }) => {
    if (add) $snackbar.classList.add(...buildCX(add));
    if (remove) $snackbar.classList.remove(...buildCX(remove));
  };

  const handleAnimationEnd = () => {
    if ($snackbar.className.includes('enter'))
      toggleClass({
        add: 'show',
        remove: 'enter',
      });
    else {
      toggleClass({
        remove: 'show exit',
      });
      $snackbar.remove();
    }
  };

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    timeoutId = window.setTimeout(() => {
      toggleClass({
        add: 'show exit',
      });
    }, SNACKBAR_DURATION);
  };

  $snackbar.addEventListener('animationend', handleAnimationEnd);
  $snackbar.addEventListener('mouseenter', handleMouseEnter);
  $snackbar.addEventListener('mouseleave', handleMouseLeave);

  const openSnackbar = () => {
    toggleClass({
      add: 'enter',
    });
    document.querySelector('#snackbarRoot')?.append($snackbar);
    timeoutId = window.setTimeout(() => {
      toggleClass({
        add: 'exit',
      });
    }, SNACKBAR_DURATION);
  };

  return openSnackbar;
};

export default initSnackbar;
