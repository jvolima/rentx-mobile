import React from 'react';
import { ThemeProvider } from 'styled-components';
import useCachedResources from './src/hooks/useCachedResources';
import { Routes } from './src/routes';
import { CarDetails } from './src/screens/CarDetails';

import { Home } from './src/screens/Home';
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingComplete } from './src/screens/SchedulingComplete';
import { SchedulingDetails } from './src/screens/SchedulingDetails';
import theme from './src/styles/theme';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if(!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}
