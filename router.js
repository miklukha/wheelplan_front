import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from './src/helpers/variables';
import {
  CategoriesScreen,
  LoginScreen,
  MainScreen,
  RegisterScreen,
  WheelScreen,
} from './src/screens';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Main">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Main"
          component={MainScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegisterScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10,
          height: 90,
          backgroundColor: colors.mainBg,
        },
      }}
      initialRouteName="Wheel"
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="ship-wheel"
                size={36}
                color={colors.inputBorder}
              />
              {focused && <View style={styles.emphasis} />}
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Wheel"
        component={WheelScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="format-list-checkbox"
                size={36}
                color={colors.inputBorder}
              />
              {focused && <View style={styles.emphasis} />}
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Categories"
        component={CategoriesScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  emphasis: {
    borderBottomColor: colors.accent,
    borderBottomWidth: 4,
    borderRadius: 4,
    width: 40,
    marginTop: 2,
  },
});
