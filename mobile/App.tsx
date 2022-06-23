import React from 'react';
import { ThemeProvider } from 'styled-components';
import useCachedResources from './src/hooks/useCachedResources';
import { Routes } from './src/routes';
import { LogBox } from 'react-native'

import theme from './src/styles/theme';
import { AppProvider } from './src/hooks';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.'
])

export default function App() {
  const isLoadingComplete = useCachedResources();

  if(!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  )
}
