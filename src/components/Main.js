import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoute } from '../../router';
import { useData } from '../hooks/useData';
import { fetchCurrent } from '../redux/auth/authOperations';
import ToastManager from 'toastify-react-native';

export const Main = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useData();

  useEffect(() => {
    dispatch(fetchCurrent());
  }, [dispatch]);

  const routing = useRoute(isLoggedIn);

  return (
    <>
      <ToastManager />
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
};
