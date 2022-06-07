import React from 'react';
import { StatusBar } from 'react-native';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { useNavigation } from '@react-navigation/native';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import {
  Container, 
  Header,
  CarImages,
  Content,
  Details,
  Brand,
  Name,
  Description,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer
} from './styles'
import { Button } from '../../components/Button';

export function CarDetails(){
  const navigation = useNavigation();

  function handleBackHome() {
    navigation.navigate('Home');
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling');
  }

  return(
    <Container> 
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent' 
        translucent
      />
      <Header>
        <BackButton onPress={handleBackHome} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={['https://www.pngmart.com/files/16/Convertible-Red-Lamborghini-PNG-Transparent-Image.png']} 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
        </Accessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário
          touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período de aluguel' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}