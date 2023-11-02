import { renderIndex } from './pages/index.js';
import { renderSearch } from './pages/search.js';

export const routes = {
  '/': renderIndex,
  '/search': renderSearch,
};
