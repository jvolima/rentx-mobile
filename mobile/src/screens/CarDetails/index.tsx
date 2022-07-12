import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Car as ModelCar } from '../../database/model/Car';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
  Container, 
  Header,
  CarImages,
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
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

interface Params {
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  
  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

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

      <Animated.View 
        style={[
          headerStyleAnimation, 
          styles.header, 
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
          <BackButton onPress={handleBackHome} />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation, { marginTop: getStatusBarHeight() + 32 }]}>
          <ImageSlider 
            imagesUrl={car.photos} 
          />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignItems: 'center',
          paddingTop: 184
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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
      </Animated.ScrollView>

      <Footer>
        <Button title='Escolher período de aluguel' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },
})