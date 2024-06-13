import cx from '../cx';
import { Snackbar, useSnackbar } from './SnackbarContext';

const SnackbarItem = ({ id, children }: Snackbar) => {
  return <div className={cx('SnackbarItem')}>{}</div>;
};

const SnackbarRoot = () => {
  const snackbars = useSnackbar();
  return (
    <div className={cx('Snackbars')}>
      {snackbars.map((snackbar) => (
        <SnackbarItem key={snackbar.id} {...snackbar} />
      ))}
    </div>
  );
};

export default SnackbarRoot;
