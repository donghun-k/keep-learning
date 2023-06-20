import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import userReducer from './userReducers';

export const store = createStore(userReducer);
export const persistor = persistStore(store);
