// import { createSelector } from '@reduxjs/toolkit';

// const getStatusValue = state => state.user;
// const getUser = state => state.user;

// export const statusSelector = createSelector(getUser, state => state.isAuth);

// export const userSelector = createSelector(getUser, state => state);

export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;

// export const authSelectors = {
//   getIsLoggedIn,
//   getUser,
// };
