import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from './src/helpers/variables';
import {
  CategoriesScreen,
  GoalAddScreen,
  LoginScreen,
  MainScreen,
  ProfileScreen,
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
                size={40}
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
              <AntDesign
                name="pluscircleo"
                size={32}
                color={colors.inputBorder}
              />
              {focused && <View style={styles.emphasis} />}
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="GoalAdd"
        component={GoalAddScreen}
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
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="account-box-outline"
                size={36}
                color={colors.inputBorder}
              />
              {focused && <View style={styles.emphasis} />}
            </View>
          ),
          tabBarShowLabel: false,
        }}
        name="Profile"
        component={ProfileScreen}
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
