import VanillaWrapper from '@/components/vanillaWrapper';
import data from '../data';
import { generateDOM, stringToDOM } from '@/service/util';
import cx from '../cx';
import initSnackbar from './snackbar';

const initiator = (wrapper: HTMLDivElement) => {
  const $items = data.map(({ id, name }, index) => {
    const $snackbarContent = generateDOM(
      'p',
      undefined,
      `${index + 1}. ${name}`
    );
    const openSnackbar = initSnackbar($snackbarContent);
    const $button = generateDOM('button', undefined, 'Open Snackbar');
    $button.addEventListener('click', openSnackbar);
    const $item = generateDOM('span', cx('listItem'), `#${index + 1} `);
    $item.append($button);
    return $item;
  });

  wrapper.append(
    ...$items,
    stringToDOM(`<div id="snackbarRoot"  class="${cx('Snackbars')}"/>`)
  );
};

const Snackbar3 = () => (
  <>
    <h2>Snackbar</h2>
    <VanillaWrapper initiator={initiator} title="#3" />
  </>
);

export default Snackbar3;
