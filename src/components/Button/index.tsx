import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import {
  Container, Title
} from './styles'

interface Props {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ 
  title, 
  color,
  onPress,
  disabled = false,
  loading = false
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
        <Title>{title}</Title>
      }
    </Container>
  );
}