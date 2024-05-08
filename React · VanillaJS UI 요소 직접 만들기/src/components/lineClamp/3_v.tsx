import VanillaWrapper from '../vanillaWrapper';
import cx from './cx';
import data from './data';

const clmapeElBuilder = (text: string, wrapper: HTMLDivElement) => {
  let isClamped = true;

  const toggleClamped = (e: Event | null, force?: boolean) => {
    isClamped = typeof force === 'boolean' ? force : !isClamped;
    $content.classList.toggle(cx('clamped'), isClamped);
    if (isClamped) $content.append($btn);
    else $btn.remove();
  };

  const $clone = document.createElement('div');
  $clone.classList.add(cx('text-clone'));
  $clone.textContent = text;

  const $text = document.createElement('div');
  $text.classList.add(cx('text'));
  $text.textContent = text;
  $text.style.webkitLineClamp = '3';

  const $btn = document.createElement('button');
  $btn.classList.add(cx('buttonMore'));
  $btn.addEventListener('click', toggleClamped, { once: true });

  const $content = document.createElement('div');
  $content.classList.add(cx('content'));
  $content.append($clone, $text);

  const handleMutate = () => {
    const lineHeight = parseInt(getComputedStyle($text).lineHeight, 10);
    const lines = Math.floor($clone.offsetHeight / lineHeight);
    toggleClamped(null, lines > 3);
  };

  const observer = new MutationObserver(() => {
    if (document.contains($content)) {
      handleMutate();
      observer.disconnect();
    }
  });

  observer.observe(wrapper, {
    childList: true,
    subtree: true,
  });

  return $content;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $els = data.map((text) => clmapeElBuilder(text, wrapper));
  wrapper.append(...$els);
};

const LineClamp3 = () => <VanillaWrapper initiator={initiator} title="#3" />;

export default LineClamp3;
