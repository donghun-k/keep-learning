import { LOGIN, LOGOUT } from './userActions';

const initialState = {
  id: null,
  username: null,
  email: null,
  firstName: null,
  lastName: null,
  gender: null,
  image: null,
  token: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};
