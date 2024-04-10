import { Store } from '../core';

interface State {
  photo: string;
  name: string;
  email: string;
  github: string;
  repo: string;
  blog: string;
}

export default new Store<State>({
  photo: 'https://avatars.githubusercontent.com/u/60064471?v=4',
  name: 'DongHun, Kim',
  email: 'donghun.kdh@gmail.com',
  github: 'https://github.com/donghun-k',
  repo: 'https://github.com/donghun-k/front-end-exercises',
  blog: 'https://velog.io/@donghun-k',
});
