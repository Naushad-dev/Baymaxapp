import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {navigate, resetAndNavigate} from '../utils/NavigationUtils';
import {ScreenHight, ScreenWidth} from '../utils/Scaling';
import Animated, {Easing, SlideInDown} from 'react-native-reanimated';
import {Colors, Fonts, lightColors} from '../utils/Constants';
import {LinearGradient} from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import CustomText from '../components/CustomText';
import {Image} from 'react-native';
import Tts from 'react-native-tts';
import { initializeTtsListeners } from '../utils/PlaySound';

const Splash = () => {
  
  const bottomColors = [...lightColors].reverse();

  const handleNavigation = () => {
    navigate('baymax');
  };

  useEffect(() => {
    initializeTtsListeners()
    setTimeout(()=>{Tts.speak("Hello World I am Baymax ")},2000)
    setTimeout(() => {
      resetAndNavigate('baymax');
    }, 5500);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.imageContainer]}
        entering={SlideInDown.duration(1000).delay(500).easing(Easing.ease)}>
        <Image
          source={require('../assets/images/launch.png')}
          style={styles.imageStyle}
        />
      </Animated.View>

      <Animated.View
        style={styles.gradientContainer}
        entering={SlideInDown.duration(1000).easing(Easing.ease)}>
        <LinearGradient colors={bottomColors} style={styles.gradient}>
          <View style={styles.TextContainer}>
            <CustomText fontFamily={Fonts.Theme} fontSize={34}>
              BayMax !
            </CustomText>
            <LottieView
              source={require('../assets/animations/sync.json')}
              autoPlay={true}
              loop
              style={{width: 280, height: 100}}
            />
            <CustomText fontFamily={'Medium'}>
              Synchronizing for better experience......
            </CustomText>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: Colors.primary,
  },
  imageContainer: {
    width: ScreenWidth - 20,
    height: ScreenHight * 0.5,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  gradientContainer: {
    position: 'absolute',
    height: '35%',
    bottom: 0,
    width: '100%',
  },
  gradient: {
    height: '100%',
    width: '100%',
    paddingTop: 30,
  },
  TextContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowOffset: {height: 1, width: 1},
    shadowColor: Colors.border,
    shadowOpacity: 1,
    alignItems: 'center',
    shadowRadius: 2,
    elevation: 5,
  },
});
