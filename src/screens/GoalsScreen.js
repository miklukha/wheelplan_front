import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GoalAddScreen } from './GoalAddScreen';
import { GoalEditScreen } from './GoalEditScreen';

const NestedScreen = createStackNavigator();

export const GoalsScreen = () => {
  return (
    <NestedScreen.Navigator initialRouteName="GoalAdd">
      <NestedScreen.Screen
        name="GoalAdd"
        component={GoalAddScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="GoalEdit"
        component={GoalEditScreen}
        options={{
          headerShown: false,
        }}
      />
    </NestedScreen.Navigator>
  );
};
