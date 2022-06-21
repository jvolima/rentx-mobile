import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';

import {
  Container, Title
} from './styles'

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({ 
  title, 
  color,
  onPress,
  loading = false,
  light = false,
  disabled = false
}: Props){
  const theme = useTheme();

  return(
    <Container 
      disabled={disabled}
      onPress={onPress}
      style={{ opacity: (disabled === true || loading === true) ? .5 : 1 }} 
      color={color}
    >
      { 
        loading ? 
        <ActivityIndicator color={theme.colors.background_secondary} /> :
        <Title light={light}>{title}</Title>
      }
    </Container>
  );
}