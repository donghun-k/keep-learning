const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'donghun',
        mongodb_password: '9g1plV6W9txlXgc2',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site-dev',
      },
    };
  }
  return {
    env: {
      mongodb_username: 'donghun',
      mongodb_password: '9g1plV6W9txlXgc2',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'my-site',
    },
  };
};
