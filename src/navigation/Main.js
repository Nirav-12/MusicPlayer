import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or any icon library
import HomeScreen from '../screens/HomeScreen';
import PlayVideo from '../screens/PlayVideo';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function MainTab() {
  return (
    <>
      <PlayVideo />

      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveBackgroundColor: 'black',
          tabBarInactiveBackgroundColor: 'black',
          tabBarActiveTintColor: '#4E9CA8',
          tabBarInactiveTintColor: 'white',
          headerShown: false,
          tabBarStyle: {
            height: 50,
          },
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
}
