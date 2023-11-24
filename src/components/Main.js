import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoute } from '../../router';
import { useAuth } from '../hooks/useAuth';
import { fetchCurrent } from '../redux/auth/authOperations';

export const Main = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    dispatch(fetchCurrent());
  }, [dispatch]);

  const routing = useRoute(isLoggedIn);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
