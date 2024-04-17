import VanillaWrapper from '../vanillaWrapper';
import cx from './cx';
import data from './data';

const itemBuilder = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const $li = document.createElement('li');
  $li.classList.add(cx('item'), cx('item3'));
  $li.setAttribute('data-id', id);

  const $description = document.createElement('div');
  $description.classList.add(cx('description'));
  $description.textContent = description;

  const $tab = document.createElement('div');
  $tab.classList.add(cx('tab'));
  $tab.textContent = title;

  $li.append($tab, $description);

  return $li;
};

const initiator = (wrapper: HTMLElement) => {
  let currentId: string | null = data[0]?.id;

  const $ul = document.createElement('ul');
  $ul.classList.add(cx('container'));

  const handleClickTab = (e: Event) => {
    const $el = e.target as HTMLElement;
    if (!$el.classList.contains(cx('tab'))) return;
    const targetId = $el.parentElement?.dataset.id;
    if (!targetId) return;
    currentId = targetId === currentId ? null : targetId;
    $items.forEach(($item) => {
      $item.classList.toggle(cx('current'), $item.dataset.id === currentId);
    });
  };
  $ul.addEventListener('click', handleClickTab);

  const $items = data.map(itemBuilder);
  $ul.append(...$items);

  wrapper.append($ul);
  $items[0].classList.add(cx('current'));
};

const Accordion4 = () => {
  return <VanillaWrapper title="#4" initiator={initiator} />;
};

export default Accordion4;
