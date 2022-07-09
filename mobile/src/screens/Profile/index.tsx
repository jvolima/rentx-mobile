import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

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
  const { user } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

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

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    if(result.cancelled) {
      return;
    }

    if(result.uri) {
      setAvatar(result.uri);
    }
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
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
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
                  onChangeText={setName}
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
                  onChangeText={setDriverLicense}
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