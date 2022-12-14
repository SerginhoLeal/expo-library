import * as React from 'react';
import * as Native from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '@common';
import { RootStackParamList } from '@types';

import HomeScreen from './pages/home';
import ProfileScreen from './pages/profile';
import SliderScreen from './pages/slider';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Router() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Icon name='home' color='#888' />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 2,
            height: 70
          },
          headerTintColor: '#888',
          tabBarIcon: () => <Icon name='home' color='#888' />,
          tabBarLabelStyle: {
            display: 'none',
          }
        }}
      />
      <Tab.Screen
        name="Slider"
        component={SliderScreen}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => <Icon name='user' color='#888' />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 2,
            height: 70,
          },
          headerTintColor: '#888',
          tabBarIcon: () => <Icon name='user' color='#888' />,
          tabBarLabelStyle: { display: 'none' },
          headerRight: () => (
            <Native.TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <Icon name='plus' size='50' />
            </Native.TouchableOpacity>
          )
        }}
      />
    </Tab.Navigator>
  );
};
