import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { ContextProvider } from '@context';

export default function App() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </NavigationContainer>
  );
}