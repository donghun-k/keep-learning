import cx from '../cx';
import data from '../data';
import useSnackbar from './useSnackbar';

interface ListItemProps {
  id: string;
  name: string;
  index: number;
}

const ListItem = ({ id, name, index }: ListItemProps) => {
  const { snackbar, open } = useSnackbar(
    <p>
      {index + 1}. {name}
    </p>
  );

  return (
    <span className={cx('listItem')} id={id}>
      #{index + 1} <button onClick={open}>Open Snackbar</button>
      {snackbar}
    </span>
  );
};
const Snackbar2 = () => {
  return (
    <>
      <h2>Snackbar</h2>
      <h3>
        #2. React<sub>Portal</sub>
      </h3>
      {data.map((item, index) => (
        <ListItem key={item.id} index={index} {...item} />
      ))}
      <div id="snackbarRoot" className={cx('Snackbars')} />
    </>
  );
};

export default Snackbar2;
