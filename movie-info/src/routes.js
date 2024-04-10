import {
  renderIndex,
  getInitialHTML as getInitialHTMLForIndex,
} from './pages/index.js';
import {
  renderSearch,
  getInitialHTML as getInitialHTNKForSearch,
} from './pages/search.js';

export const routes = {
  '/': renderIndex,
  '/search': renderSearch,
};

export const getInitialHTML = {
  '/': getInitialHTMLForIndex,
  '/search': getInitialHTNKForSearch,
};
