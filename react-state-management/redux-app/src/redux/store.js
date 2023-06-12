import { createStore } from 'redux';
import userReducer from './user/userReducer';

export const store = createStore(userReducer);
