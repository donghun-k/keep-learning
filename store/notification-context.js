import { createContext, useState } from 'react';

const NotificationContext = createContext({
  Notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  return (
    <NotificationContext.Provider>
      {props.children}
    </NotificationContext.Provider>
  );
}
export default NotificationContext;
