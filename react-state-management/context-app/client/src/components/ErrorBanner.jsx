import React from 'react';

const ErrorBanner = ({ message }) => {
  return <div style={{ backgroundColor: 'red' }}>{message}</div>;
};

export default ErrorBanner;
