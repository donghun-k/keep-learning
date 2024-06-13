import cx from '../cx';
import data from '../data';
import { useSetSnackbar } from './SnackbarContext';

interface ListItemProps {
  id: string;
  name: string;
  index: number;
}

const ListItem = ({ id, name, index }: ListItemProps) => {
  const { createSnackbar } = useSetSnackbar();

  return (
    <span className={cx('listItem')} id={id}>
      #{index + 1} <button onClick={() => {}}>{name}</button>
    </span>
  );
};

const Snackbar1 = () => {
  return (
    <>
      <h2>Snackbar</h2>
      <h3>
        #1. React<sub>Context</sub>
      </h3>
      {data.map((item, index) => (
        <ListItem key={item.id} index={index} {...item} />
      ))}
    </>
  );
};
