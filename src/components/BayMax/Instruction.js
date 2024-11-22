import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import CustomText from '../CustomText';
import Markdown from 'react-native-markdown-display';
import { Fonts } from '../../utils/Constants';

const Instruction = ({message, onCross,type}) => {
  console.log("message onInstruction", message);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cross} onPress={onCross}>
        <Icons name="close-circle" color={'red'} size={RFValue(20)} />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/logo_short.png')}
        style={styles.logo}
      />
      <CustomText fontFamily={Fonts.Theme} fontSize={RFValue(22)}>{type}</CustomText>
      <View>
        {message === 'meditation' ? (
          <LottieView
            source={require('../../assets/animations/breath.json')}
            style={{
              height: 400,
              width: 400,
            }}
            loop
            autoPlay
          />
        ) : (
        <Markdown style={{
          body:{
            fontFamily: Fonts.Theme,
            padding:20,
            fontSize:RFValue(22),
            color:"black"
          }
        }}>
        {message}
        
        </Markdown>
        )}
      </View>
    </View>
  );
};

export default Instruction;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 10,
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  logo: {
    height: 40,
    width: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cross: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
