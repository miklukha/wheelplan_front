// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";
// import { useRoute } from "../router";
import { View, Text } from 'react-native';

// import { authStateCahngeUser } from "../redux/auth/authOperations";

export const Main = () => {
  return (
    <View>
      <Text>Main Page</Text>
    </View>
  );
  // const { stateChange } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authStateCahngeUser());
  // }, [stateChange]);

  // const routing = useRoute(stateChange);

  // return <NavigationContainer>{routing}</NavigationContainer>;
};
