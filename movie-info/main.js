import { start } from './src/router';
import { routes, getInitialHTML } from './src/routes';

export { getInitialHTML };

if (typeof window !== 'undefined') {
  start({
    routes,
  });
}
