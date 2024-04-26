import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import { useViewportRect } from './ViewportContext';

type Style = Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>;

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const viewportRect = useViewportRect();
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<Style>({});

  useLayoutEffect(() => {
    if (!wrapperRef.current || !targetRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();
    const verticalKey =
      wrapperRect.bottom + targetRect.height < viewportRect.height
        ? 'top'
        : 'bottom';
    const horizontalKey =
      wrapperRect.right + targetRect.width < viewportRect.width
        ? 'left'
        : 'right';
    setStyle({
      [verticalKey]: 0,
      [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
      [horizontalKey]: 0,
      [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
    });
  }, [viewportRect]);

  return (
    <details className={cx('details')} data-tooltip={id} ref={wrapperRef}>
      <summary className={cx('summary')} data-tooltip-summary>
        {title}
      </summary>
      <div
        className={cx('tooltip')}
        onClick={(e) => e.stopPropagation()}
        ref={targetRef}
        style={style}
      >
        {description}
      </div>
    </details>
  );
};

const Tooltip4 = () => {
  useEffect(() => {
    const closeAllTooltip = (e: Event) => {
      const target = e.target as HTMLElement;
      const isSummary = !!target.dataset.tooltipSummary;
      if (isSummary) return;
      document.querySelectorAll('[data-tooltip]').forEach((tooltip) => {
        if (tooltip !== target.parentElement) {
          tooltip.removeAttribute('open');
        }
      });
    };
    window.addEventListener('click', closeAllTooltip);
    return () => {
      window.removeEventListener('click', closeAllTooltip);
    };
  }, []);
  return (
    <>
      <h3>
        #4. React<sub>툴팁이 Viewport 안에서만 보이도록 처리</sub>
      </h3>
      {data.map((item) => (
        <Tooltip key={item.id} {...item} />
      ))}
    </>
  );
};

export default Tooltip4;
