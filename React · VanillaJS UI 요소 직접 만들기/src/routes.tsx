import Accordions from './components/accordion';
import Carousels from './components/carousel';
import Dropdowns from './components/dropdown';
import Gallery1 from './components/gallery/1_r';
import Gallery2 from './components/gallery/2_r';
import ImageSlides from './components/imageSlide';
import InfiniteScroll1 from './components/infiniteScroll/react';
import InfiniteScroll2 from './components/infiniteScroll/vanilla';
import LazyLoading1 from './components/lazyLoading/1_r';
import LazyLoading2 from './components/lazyLoading/2_v';
import LineClamps from './components/lineClamp';
import Modal1 from './components/modal/1_r';
import Modal2 from './components/modal/2_r';
import Modal3 from './components/modal/3_v';
import Modal4 from './components/modal/4_r';
import Popover1 from './components/popover/1_r';
import Popover2 from './components/popover/2_r';
import Popover3 from './components/popover/3_r';
import ScrollBoxes from './components/scrollBox';
import Scrollspy1 from './components/scrollspy/1_r';
import Scrollspy2 from './components/scrollspy/2_r';
import Scrollspy3 from './components/scrollspy/3_v';
import Scrollspy4 from './components/scrollspy/4_r';
import Snackbar1 from './components/snackbar/1_r';
import Snackbar2 from './components/snackbar/2_r';
import Snackbar3 from './components/snackbar/3_v';
import TabMenus from './components/tabMenu';
import TextBoxes from './components/textBox';
import Tooltips from './components/tooltip';

export const routePaths = [
  '/',
  '/accordion',
  '/tabMenu',
  '/tooltip',
  '/textBox',
  '/lineClamp',
  '/lazyLoading',
  '/lazyLoading/1_r',
  '/lazyLoading/2_v',
  '/infiniteScroll',
  '/infiniteScroll/react',
  '/infiniteScroll/vanilla',
  '/scrollBox',
  '/scrollspy',
  '/scrollspy/1_r',
  '/scrollspy/2_r',
  '/scrollspy/3_v',
  '/scrollspy/4_r',
  '/snackbar',
  '/snackbar/1_r',
  '/snackbar/2_r',
  '/snackbar/3_v',
  '/modal',
  '/modal/1_r',
  '/modal/2_r',
  '/modal/3_v',
  '/modal/4_r',
  '/popover',
  '/popover/1_r',
  '/popover/2_r',
  '/popover/3_r',
  '/imageSlide',
  '/carousel',
  '/gallery',
  '/gallery/1_r',
  '/gallery/2_r',
  '/dropdown',
  '/autoComplete',
  '/dnd',
] as const;
export type ROUTE_PATH = (typeof routePaths)[number];

type BaseRoute = {
  key: ROUTE_PATH;
  link: ROUTE_PATH;
  name: string;
};
export type ParentRoute = BaseRoute & {
  children: ROUTE_PATH[];
};
export type ChildRoute = BaseRoute & {
  children: ((props: unknown) => JSX.Element) | null;
};
export type ROUTE = ParentRoute | ChildRoute;

export const routes: Record<ROUTE_PATH, ROUTE> = {
  '/': {
    key: '/',
    link: '/',
    name: 'root',
    children: [
      '/accordion',
      '/tabMenu',
      '/tooltip',
      '/textBox',
      '/lineClamp',
      '/lazyLoading',
      '/infiniteScroll',
      '/scrollBox',
      '/scrollspy',
      '/snackbar',
      '/modal',
      '/popover',
      '/imageSlide',
      '/carousel',
      '/gallery',
      '/dropdown',
      '/autoComplete',
      '/dnd',
    ],
  },
  '/accordion': {
    key: '/accordion',
    link: '/accordion',
    name: '01. 아코디언',
    children: Accordions,
  },
  '/tabMenu': {
    key: '/tabMenu',
    link: '/tabMenu',
    name: '02. 탭메뉴',
    children: TabMenus,
  },
  '/tooltip': {
    key: '/tooltip',
    link: '/tooltip',
    name: '03. 툴팁',
    children: Tooltips,
  },
  '/textBox': {
    key: '/textBox',
    link: '/textBox',
    name: '04. 반응형 텍스트박스',
    children: TextBoxes,
  },
  '/lineClamp': {
    key: '/lineClamp',
    link: '/lineClamp',
    name: '05. 여러줄 말줄임',
    children: LineClamps,
  },
  '/lazyLoading': {
    key: '/lazyLoading',
    link: '/lazyLoading/1_r',
    name: '06. 지연 로딩',
    children: ['/lazyLoading/1_r', '/lazyLoading/2_v'],
  },
  '/lazyLoading/1_r': {
    key: '/lazyLoading/1_r',
    link: '/lazyLoading/1_r',
    name: 'React',
    children: LazyLoading1,
  },
  '/lazyLoading/2_v': {
    key: '/lazyLoading/2_v',
    link: '/lazyLoading/2_v',
    name: 'Vanilla',
    children: LazyLoading2,
  },
  '/infiniteScroll': {
    key: '/infiniteScroll',
    link: '/infiniteScroll/react',
    name: '07. 무한 스크롤',
    children: ['/infiniteScroll/react', '/infiniteScroll/vanilla'],
  },
  '/infiniteScroll/react': {
    key: '/infiniteScroll/react',
    link: '/infiniteScroll/react',
    name: 'React',
    children: InfiniteScroll1,
  },
  '/infiniteScroll/vanilla': {
    key: '/infiniteScroll/vanilla',
    link: '/infiniteScroll/vanilla',
    name: 'Vanilla',
    children: InfiniteScroll2,
  },
  '/scrollBox': {
    key: '/scrollBox',
    link: '/scrollBox',
    name: '08. 횡 스크롤 박스',
    children: ScrollBoxes,
  },
  '/scrollspy': {
    key: '/scrollspy',
    link: '/scrollspy/1_r',
    name: '09. 스크롤스파이',
    children: [
      '/scrollspy/1_r',
      '/scrollspy/2_r',
      '/scrollspy/3_v',
      '/scrollspy/4_r',
    ],
  },
  '/scrollspy/1_r': {
    key: '/scrollspy/1_r',
    link: '/scrollspy/1_r',
    name: 'R - Scroll',
    children: Scrollspy1,
  },
  '/scrollspy/2_r': {
    key: '/scrollspy/2_r',
    link: '/scrollspy/2_r',
    name: 'R - IO',
    children: Scrollspy2,
  },
  '/scrollspy/3_v': {
    key: '/scrollspy/3_v',
    link: '/scrollspy/3_v',
    name: 'Vanilla',
    children: Scrollspy3,
  },
  '/scrollspy/4_r': {
    key: '/scrollspy/4_r',
    link: '/scrollspy/4_r',
    name: 'R - ScrollBox',
    children: Scrollspy4,
  },
  '/snackbar': {
    key: '/snackbar',
    link: '/snackbar/1_r',
    name: '10. 스낵바',
    children: ['/snackbar/1_r', '/snackbar/2_r', '/snackbar/3_v'],
  },
  '/snackbar/1_r': {
    key: '/snackbar/1_r',
    link: '/snackbar/1_r',
    name: 'R - Context',
    children: Snackbar1,
  },
  '/snackbar/2_r': {
    key: '/snackbar/2_r',
    link: '/snackbar/2_r',
    name: 'R - Portal',
    children: Snackbar2,
  },
  '/snackbar/3_v': {
    key: '/snackbar/3_v',
    link: '/snackbar/3_v',
    name: 'Vanilla',
    children: Snackbar3,
  },
  '/modal': {
    key: '/modal',
    link: '/modal/1_r',
    name: '11. 모달',
    children: ['/modal/1_r', '/modal/2_r', '/modal/3_v', '/modal/4_r'],
  },
  '/modal/1_r': {
    key: '/modal/1_r',
    link: '/modal/1_r',
    name: 'R - Context',
    children: Modal1,
  },
  '/modal/2_r': {
    key: '/modal/2_r',
    link: '/modal/2_r',
    name: 'R - Portal',
    children: Modal2,
  },
  '/modal/3_v': {
    key: '/modal/3_v',
    link: '/modal/3_v',
    name: 'Vanilla',
    children: Modal3,
  },
  '/modal/4_r': {
    key: '/modal/4_r',
    link: '/modal/4_r',
    name: 'R - HTML Dialog',
    children: Modal4,
  },
  '/popover': {
    key: '/popover',
    link: '/popover/1_r',
    name: '12. 팝오버',
    children: ['/popover/1_r', '/popover/2_r', '/popover/3_r'],
  },
  '/popover/1_r': {
    key: '/popover/1_r',
    link: '/popover/1_r',
    name: 'R - Basic',
    children: Popover1,
  },
  '/popover/2_r': {
    key: '/popover/2_r',
    link: '/popover/2_r',
    name: 'R - Portal',
    children: Popover2,
  },
  '/popover/3_r': {
    key: '/popover/3_r',
    link: '/popover/3_r',
    name: 'R - HTML Dialog',
    children: Popover3,
  },
  '/imageSlide': {
    key: '/imageSlide',
    link: '/imageSlide',
    name: '13. 이미지 슬라이드',
    children: ImageSlides,
  },
  '/carousel': {
    key: '/carousel',
    link: '/carousel',
    name: '14. 캐러셀',
    children: Carousels,
  },
  '/gallery': {
    key: '/gallery',
    link: '/gallery/1_r',
    name: '15. 갤러리',
    children: ['/gallery/1_r', '/gallery/2_r'],
  },
  '/gallery/1_r': {
    key: '/gallery/1_r',
    link: '/gallery/1_r',
    name: 'R - w/Carousel',
    children: Gallery1,
  },
  '/gallery/2_r': {
    key: '/gallery/2_r',
    link: '/gallery/2_r',
    name: 'R - Viewer',
    children: Gallery2,
  },
  '/dropdown': {
    key: '/dropdown',
    link: '/dropdown',
    name: '16. 드랍다운',
    children: Dropdowns,
  },
  '/autoComplete': {
    key: '/autoComplete',
    link: '/autoComplete',
    name: '17. 자동 완성',
    children: null,
  },
  '/dnd': {
    key: '/dnd',
    link: '/dnd',
    name: '18. D&D 리스트',
    children: null,
  },
};

export const isParentRoute = (route: ROUTE): route is ParentRoute =>
  Array.isArray(route.children);

export const gnbRootList = (routes['/'] as ParentRoute)?.children?.map(
  (r) => routes[r]
);
