import React, { useState, useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';

// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import { Main } from './components/Main';

export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  const routing = useRoute(isAuth);

  // const { stateChange } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authStateCahngeUser());
  // }, [stateChange]);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
