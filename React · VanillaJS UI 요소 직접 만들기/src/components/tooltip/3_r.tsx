import { useEffect } from 'react';
import cx from './cx';
import data from './data';

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <details className={cx('details')} data-tooltip={id}>
      <summary className={cx('summary')} data-tooltip-summary>
        {title}
      </summary>
      <div className={cx('tooltip')} onClick={(e) => e.stopPropagation()}>
        {description}
      </div>
    </details>
  );
};

const Tooltip3 = () => {
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
        #3. React<sub>HTML details 태그 사용</sub>
      </h3>
      {data.map((item) => (
        <Tooltip key={item.id} {...item} />
      ))}
    </>
  );
};

export default Tooltip3;
