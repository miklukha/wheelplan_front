import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Toast } from 'toastify-react-native';
import { authSlice } from './authSlice';

const { updateUserData, updateToken, updateIsLoggedIn, authLogout } =
  authSlice.actions;

axios.defaults.baseURL =
  'http://ec2-15-237-125-96.eu-west-3.compute.amazonaws.com:3000';

export const register = userData => async dispatch => {
  try {
    const { data } = await axios.post('/api/auth/register', userData);
    await AsyncStorage.setItem('token', data.token);

    dispatch(updateUserData(data));
    dispatch(updateToken(data));
    dispatch(updateIsLoggedIn({ isLoggedIn: true }));
  } catch (error) {
    Toast.error('Щось пішло не так :(');
    console.log(error);
    // throw error;
  }
};

export const login = userData => async dispatch => {
  try {
    const { data } = await axios.post('/api/auth/login', userData);
    await AsyncStorage.setItem('token', data.token);

    dispatch(updateUserData(data));
    dispatch(updateToken(data));
    dispatch(updateIsLoggedIn({ isLoggedIn: true }));
  } catch (error) {
    console.log(error);
    Toast.error('Неправильний пароль чи логін');
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/auth/logout');
    await AsyncStorage.removeItem('token');

    dispatch(authLogout());
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrent = () => async dispatch => {
  try {
    const initialToken = await AsyncStorage.getItem('token');
    if (initialToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${initialToken}`;
    }

    const { data } = await axios.get('/api/auth/current');
    dispatch(updateUserData(data));
    dispatch(updateIsLoggedIn({ isLoggedIn: true }));
  } catch (error) {
    console.log(error);
  }
};
