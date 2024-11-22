import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenHight, ScreenWidth} from '../utils/Scaling';
import {BlurView} from '@react-native-community/blur';

const Background = ({blurOpacity}) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.img}
        source={require('../assets/images/baymax.png')}
      />
      <Animated.View style={[styles.absolute, {opacity: blurOpacity}]}>
        <BlurView
          style={styles.absolute}
          intensity={100}
          blurReductionFactor={5}
          experimentalBlurMethod="dimezisBlurView"
          tint="systemUltraThinMaterial"
        />
      </Animated.View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  imageContainer: {
    width: ScreenWidth,
    height: ScreenHight * 1.2,
    position: 'absolute',
    zIndex: -1,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    bottom: -ScreenHight * 0.25,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
});
