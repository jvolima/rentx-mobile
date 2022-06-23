import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import * as Yup from 'yup';

import {
  Container, 
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles'
import { useAuth } from '../../../hooks/auth';

export function SignUpFirstStep(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        email: Yup.string().required('E-mail é obrigátorio').email('E-mail inválido'),
        name: Yup.string().required('Nome é obrigatório'),
      });
  
      const data = { name, email, driverLicense };
      await schema.validate(data);
  
      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.message);
      }
    }
  }

  return(
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button
            title='Próximo'
            disabled={false}
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}