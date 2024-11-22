import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Colors} from '../utils/Constants';
import Background from '../components/Background';
import Loader from '../components/Loader';
import BigHero6 from '../components/BayMax/BigHero6';
import {SpeakTTS} from '../utils/PlaySound';
import SoundPlayer from 'react-native-sound-player';
import {PlaySound} from '../utils/Sounds';
import {prompt} from '../utils/data';
import Instruction from '../components/BayMax/Instruction';
import {AskAI} from '../services/AskAI';
import Pedometer from '../components/BayMax/Pedometer';

const Baymax = () => {
  const [showLoader, setshowLoader] = useState(true);

  const [showInstruction, setshowInstruction] = useState(true);
  const [showMessage, setshowMessage] = useState('');
  const [showPedometer, setshowPedometer] = useState(false);
  const [itemType, setitemType] = useState(null);

  const blurOpacity = useRef(new Animated.Value(0)).current;
  const startBlur = () => {
    Animated.timing(blurOpacity, {
      duration: 2000,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const unBlur = () => {
    Animated.timing(blurOpacity, {
      duration: 2000,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const handleError = error => {
    SpeakTTS('There is an error occured');
    startBlur();
    setshowMessage('');
    setshowLoader(true);
    SoundPlayer.stop();
    setshowInstruction(false);
    console.log('Error occured', error);
  };
  const handleResponse = async (type, promptText, sound) => {
    setshowLoader(true);
    setshowInstruction(false);

    try {
      if (type === 'meditation') {
        SpeakTTS('Focus on your breath');
        PlaySound('meditation');
        setshowMessage('meditation');
        setshowInstruction(false);
      }

      const data = await AskAI(promptText);
      // console.log("data from ai",data);
      setshowMessage(data);

      SpeakTTS(data);
      if (type === 'happiness') {
        setshowInstruction(false);

        setTimeout(() => {
          PlaySound(sound);
        }, 5000);
      } else {
        PlaySound(sound);
      }

      unBlur();
    } catch (error) {
      handleError(error);
    } finally {
      setshowLoader(false);
    }
  };

  const handleResponse2 = async (type, prompText, sound) => {
    setshowLoader(false);
    console.log('Type getting', type);
    try {
      if (type === 'meditation') {
        setshowMessage(type);
        setitemType(type);
        setshowInstruction(false);
        SpeakTTS('Focus on Your Breath');
        PlaySound(sound);
      } else {
        setshowInstruction(false);
        setitemType(type);

        let data = await AskAI(prompText);
        setshowMessage(data);
        SpeakTTS(data);
        setTimeout(() => {
          PlaySound(sound);
        }, 5000);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setshowLoader(false);
    }
  };

  const onOptionPressHandler = type => {
    setshowInstruction(true);
    if (type === 'pedometer') {
      setshowPedometer(true);
      setshowLoader(false);
      setshowInstruction(false);
      return;
    }

    switch (type) {
      case 'happiness':
        handleResponse2(type, prompt.joke, 'laugh');
        break;
      case 'motivation':
        handleResponse2(type, prompt.motivation, 'motivation');
        break;
      case 'health':
        handleResponse2(type, prompt.health, 'meditation');
        break;
      case 'meditation':
        handleResponse2(type, prompt.health, 'meditation');
        break;
      default:
        handleError('There was no type like this');
    }
  };

  useEffect(() => {
    const timer = setTimeout(startBlur, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showMessage && (
        <Instruction
          onCross={() => {
            startBlur();
            setshowMessage('');
            setshowLoader(true);
            setshowPedometer(false);
            SoundPlayer.stop();
            setshowInstruction(true);
          }}
          message={showMessage}
          type={itemType}
        />
      )}
      {showPedometer && (
        <Pedometer
          onCross={() => {
            startBlur();
            setshowMessage('');
            setshowLoader(true);
            setshowPedometer(false);
            SoundPlayer.stop();
            setshowInstruction(true);
          }}
        />
      )}
      {showLoader && (
        <View style={styles.loaderStyle}>
          <Loader />
        </View>
      )}

      {showInstruction && <BigHero6 onPress={onOptionPressHandler} />}
      <Background blurOpacity={blurOpacity} />
    </View>
  );
};

export default Baymax;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondry,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderStyle: {
    position: 'absolute',
  },
});
