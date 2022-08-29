import * as React from 'react';
import * as Native from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '@common';

import HomeScreen from './pages/home';
import PerfilScreen from './pages/perfil';

const Tab = createBottomTabNavigator();

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
        name="Perfil"
        component={PerfilScreen}
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
