import React, { useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container, 
  IconContainer, 
  InputText
} from './styles'

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props){
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return(
    <Container isFocused={isFocused}> 
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
        secureTextEntry={isPasswordVisible}
        {...rest} 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      <TouchableOpacity 
        onPress={handlePasswordVisibilityChange}
        activeOpacity={0.7}
      >
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </TouchableOpacity>
    </Container>
  );
}