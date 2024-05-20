import cx from './cx';
import data from './data';

interface ListItemProps {
  id: string;
  number: number;
  title: string;
  description: string;
}

const ListItem = ({ number, title, description }: ListItemProps) => {
  return (
    <li>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>{description}</div>
    </li>
  );
};

const ScrollSpy1 = () => {
  return (
    <div className={cx('ScrollSpy')}>
      <header className={cx('floatingHeader')}>
        <h3 className={cx('title')}>Scroll Spy #1</h3>
        <ul className={cx('nav')}>
          {data.map((item, i) => (
            <li key={i} className={cx('navItem')}>
              <button>{i + 1}</button>
            </li>
          ))}
        </ul>
      </header>
      {data.map((item, i) => (
        <ListItem key={i} {...item} number={i + 1} />
      ))}
    </div>
  );
};

export default ScrollSpy1;
