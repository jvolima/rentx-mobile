import React from 'react';
import { ThemeProvider } from 'styled-components';
import useCachedResources from './src/hooks/useCachedResources';

import { Home } from './src/screens/Home';
import theme from './src/styles/theme';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if(!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}
