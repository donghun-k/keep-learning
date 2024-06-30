import { useEffect, useRef } from 'react';
import cx from './cx';
import data from './data';
import useStyleInView from './useStyleInView';

const tooltipPosition = {
  top: '100%',
  bottom: 20,
  left: 0,
  right: 0,
};

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const style = useStyleInView(wrapperRef, targetRef, tooltipPosition);

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
