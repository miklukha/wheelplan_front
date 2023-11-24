import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { username: null, email: null, totalRanking: null },
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserData: (state, { payload }) => ({
      ...state,
      user: {
        username: payload.username,
        email: payload.email,
        totalRanking: payload.totalRanking,
      },
    }),
    updateToken: (state, { payload }) => ({
      ...state,
      token: payload.token,
    }),
    updateIsLoggedIn: (state, { payload }) => ({
      ...state,
      isLoggedIn: payload.isLoggedIn,
    }),
    authLogout: () => initialState,
  },
});

export const authReducer = authSlice.reducer;
