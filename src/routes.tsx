import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '@common';

import HomeScreen from './pages/home';
import PerfilScreen from './pages/perfil';
import ProductScreen from './pages/product';

const Tab = createBottomTabNavigator();

export default function Router() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Icon name='home' />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 2,
            height: 70
          },
          headerTintColor: '#888',
          tabBarIcon: () => <Icon name='home' />,
          tabBarLabelStyle: {
            display: 'none',
          }
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          headerTitle: () => <Icon name='user' />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 2,
            height: 70
          },
          headerTintColor: '#888',
          tabBarIcon: () => <Icon name='user' />,
          tabBarLabelStyle: {
            display: 'none',
          }
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          tabBarStyle:{ display: 'none' },
          tabBarButton: () => null
        }}
      />
    </Tab.Navigator>
  );
};
