import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DashboardIcon from "../assets/images/house.svg";
import ExamsIcon from "../assets/images/stethoscope.svg";
import QueriesIcon from "../assets/images/user-md.svg";

import {getColor} from '../services';
import {useGlobal} from '../hooks/useGlobal';
import {SplashScreen, LoginScreen, Config, DashboardScreen, Exams, Queries, CreateAccountScreen, SignInScreen} from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthRoutes = () => {
  const {globalProps} = useGlobal();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={!globalProps.enteredPinPassword ? "login" : "sign-in"}
    >
      <Stack.Screen name="sign-in" component={SignInScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="create-account" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
};

const StackRoutes = () => {
  const {globalProps} = useGlobal();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName='dashboard'
    >
      <Stack.Screen name="dashboard" component={DashboardScreen} />
      <Stack.Screen name="exams" component={Exams} />
      <Stack.Screen name="queries" component={Queries} />
      <Stack.Screen name="config" component={Config} />
    </Stack.Navigator>
  );
};

const TabRoutes = () => {
  const {globalProps} = useGlobal();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName='dashboard'
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color }) => {
          let Icon = DashboardIcon;
          if (route.name === 'exams') {
            Icon = ExamsIcon;
          }
          if (route.name === 'queries') {
            Icon = QueriesIcon;
          }
          return <Icon color={color} width={24} height={24} />;
        },
        tabBarInactiveTintColor: getColor("font-color"),
        tabBarActiveTintColor: getColor("primary"),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#111',
          display: 'flex',
        },
      })}
    >
      <Tab.Screen name="exams" component={Exams} />
      <Tab.Screen name="dashboard" component={DashboardScreen} />
      <Tab.Screen name="queries" component={Queries} />
    </Tab.Navigator>
  );
}

export const Routes = () => {
  const {globalProps} = useGlobal();

  return globalProps?.isAppLoading ?
    <SplashScreen />
  : globalProps?.signed ?
    <TabRoutes />
  :
    <AuthRoutes />
};