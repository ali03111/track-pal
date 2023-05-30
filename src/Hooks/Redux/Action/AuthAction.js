import {types} from '../types';

export const loginUser = payload => ({
  type: types.LoginType,
  payload,
});

export const updateUser = payload => ({
  type: types.UpdateProfile,
  payload,
});

export const logOutUser = payload => ({
  type: types.LogoutType,
  payload,
});

export const updateAuth = payload => ({
  type: types.UpdateAuth,
  payload,
});

export const registerUser = payload => ({
  type: types.RegisterUser,
  payload,
});
