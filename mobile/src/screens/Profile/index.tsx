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
  OptionTitle,
  Section
} from './styles'
import { KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input } from '../../components/Input';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

export function Profile(){
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const { user } = useAuth();
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
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
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

            { 
              option === 'dataEdit' ?
              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false} 
                  defaultValue={user.name}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                />
              </Section>
              :
              <Section>
                <PasswordInput
                  iconName='lock'
                  placeholder='Senha atual'
                />
                <PasswordInput
                  iconName='lock'
                  placeholder='Nova senha'
                />
                <PasswordInput
                  iconName='lock'
                  placeholder='Repetir senha'
                />
              </Section>
            }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}