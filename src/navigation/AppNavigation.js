import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HeartIcon, HomeIcon} from 'react-native-heroicons/solid';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoriteMovieScreen from '../screens/FavoriteMovieScreen';
import navigationTheme from './navigationTheme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Movie"
        options={{headerShown: false}}
        component={MovieScreen}
      />
      <Stack.Screen
        name="Person"
        options={{headerShown: false}}
        component={PersonScreen}
      />
      <Stack.Screen
        name="Search"
        options={{headerShown: false}}
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#262626'},
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarIconStyle: {width: 24, height: 24},
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Home Screen"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <HomeIcon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites Screen"
          component={FavoriteMovieScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <HeartIcon name="heart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
