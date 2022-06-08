import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';

import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles'
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  };

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  return(
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent' 
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      
      {
        isLoading ? <Load /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={handleCarDetails} />}
        />
      }
    </Container>
  );
}