import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';

import {
  Container, 
  Header, 
  HeaderTitle, 
  HeaderTop,
  LogoutButton,
  Photo,
  PhotoContainer,
  PhotoButton
} from './styles'
import { StatusBar } from 'react-native';

export function Profile(){
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {

  }

  return(
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent' 
        translucent
      />
      <Header>
        <HeaderTop>
          <BackButton 
            color={theme.colors.background_secondary} 
            onPress={handleBack} 
          />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather 
              name="power" 
              size={24} 
              color={theme.colors.background_secondary} 
            />
          </LogoutButton>
        </HeaderTop>
        
        <PhotoContainer>
          <Photo source={{ uri: 'https://github.com/jvolima.png' }} />
          <PhotoButton onPress={() => {}}>
            <Feather 
              name="camera" 
              size={24}
              color={theme.colors.background_secondary}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
}