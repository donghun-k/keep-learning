import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  // 상태 초기값
  initialState: {
    id: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    gender: null,
    image: null,
    token: localStorage.getItem('testToken'),
  },
  reducers: {
    loginAction: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.gender = action.payload.gender;
      state.image = action.payload.image;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.token = null;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
