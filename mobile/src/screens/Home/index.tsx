import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';

import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from './styles'
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useTheme } from 'styled-components';


export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        
        if(isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if(isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            {
              !isLoading &&
              <TotalCars>
                Total de {cars.length} carros
              </TotalCars> 
            }
          </HeaderContent>
        </Header>

        {
          isLoading ? <LoadAnimation /> :
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        }

      </Container>
    </GestureHandlerRootView>
  );
}
