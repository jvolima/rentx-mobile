import React from 'react';
import { StatusBar } from 'react-native';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { useNavigation, useRoute } from '@react-navigation/native';

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
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params; 

  function handleBackHome() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car
    });
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
          imagesUrl={car.photos} 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)} 
              />
            ))
          }
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title='Escolher período de aluguel' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}