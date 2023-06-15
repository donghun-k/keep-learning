import { createStore } from 'redux';
import { persisStore } from 'redux-persist';
import userReducer from './user/userReducer';

export const store = createStore(userReducer);
export const persistor = persisStore(store);
