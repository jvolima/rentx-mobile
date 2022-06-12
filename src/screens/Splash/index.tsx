import React from 'react';
import { Button, Dimensions, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import {
  Container
} from './styles'

const WIDTH = Dimensions.get('window').width;

export function Splash(){
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(animation.value, {
          duration: 500,
          easing: Easing.bezier(1,.02,0,.92)
        }) }
      ]
    }
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return(
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />

      <Button
        title='Mover'
        onPress={handleAnimationPosition}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})