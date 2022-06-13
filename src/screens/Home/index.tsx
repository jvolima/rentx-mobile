import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Ionicons } from '@expo/vector-icons';

import { api } from '../../services/api';

import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';

import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
  MyCarsButton
} from './styles'
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity)

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  });

  const navigation = useNavigation();
  const theme = useTheme(); 

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
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
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>

      {
        isLoading ? <Load /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

      <Animated.View
        style={[
          myCarsButtonStyle,
          {
            position: 'absolute',
            bottom: 13,
            right: 22
          }
        ]}
      >
        <ButtonAnimated 
          onPress={handleOpenMyCars}
          style={[styles.button, { backgroundColor: theme.colors.main }]}
        >
          <Ionicons 
            name='ios-car-sport'
            size={32}
            color={theme.colors.background_secondary}
          />
        </ButtonAnimated>
      </Animated.View>      
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})