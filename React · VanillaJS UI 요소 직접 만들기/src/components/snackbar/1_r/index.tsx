import cx from '../cx';
import data from '../data';
import SnackbarContextProvider, { useSetSnackbar } from './SnackbarContext';

interface ListItemProps {
  id: string;
  name: string;
  index: number;
}

const ListItem = ({ id, name, index }: ListItemProps) => {
  const { createSnackbar } = useSetSnackbar();

  const handleClick = () => {
    createSnackbar(
      `snackbar_${id}`,
      <p>
        {index + 1}.<strong>{name}</strong> is clicked!
      </p>
    );
  };

  return (
    <span className={cx('listItem')} id={id}>
      #{index + 1} <button onClick={handleClick}>{name}</button>
    </span>
  );
};

const Snackbar1 = () => {
  return (
    <SnackbarContextProvider>
      <h2>Snackbar</h2>
      <h3>
        #1. React<sub>Context</sub>
      </h3>
      {data.map((item, index) => (
        <ListItem key={item.id} index={index} {...item} />
      ))}
    </SnackbarContextProvider>
  );
};

export default Snackbar1;
