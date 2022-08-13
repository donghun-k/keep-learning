import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../../Components/ui/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activieNotification = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activieNotification && (
        <Notification
          title={activieNotification.title}
          message={activieNotification.message}
          status={activieNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
