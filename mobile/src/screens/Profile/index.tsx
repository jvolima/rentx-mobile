import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle
} from './styles'
import { StatusBar } from 'react-native';

export function Profile(){
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {

  }

  function handleOptionChange(option: 'dataEdit' | 'passwordEdit') {
    setOption(option);
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

      <Content>
        <Options>
          <Option 
            onPress={() => handleOptionChange('dataEdit')}
            active={option === 'dataEdit'}
          >
            <OptionTitle active={option === 'dataEdit'}>
              Dados
            </OptionTitle>
          </Option>
          <Option 
            onPress={() => handleOptionChange('passwordEdit')}
            active={option === 'passwordEdit'}
          >
            <OptionTitle active={option === 'passwordEdit'}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
}