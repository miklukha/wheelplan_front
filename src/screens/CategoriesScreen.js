import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoriesDefaultScreen } from './CategoriesDefaultScreen';
import { CategoryScreen } from './CategoryScreen';
import { CategoryAddScreen } from './CategoryAddScreen';

const NestedScreen = createStackNavigator();

export const CategoriesScreen = () => {
  return (
    <NestedScreen.Navigator initialRouteName="CategoriesDefault">
      <NestedScreen.Screen
        name="CategoriesDefault"
        component={CategoriesDefaultScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="CategoryAdd"
        component={CategoryAddScreen}
        options={{
          headerShown: false,
        }}
      />
    </NestedScreen.Navigator>
  );
};
