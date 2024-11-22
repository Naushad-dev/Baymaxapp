import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import { Image } from 'react-native';
import { usePedometer } from '../../state/pedometerStore';
import StepCounter, { parseStepData, startStepCounterUpdate, stopStepCounterUpdate } from '@dongminyu/react-native-step-counter';
import { SpeakTTS } from '../../utils/PlaySound';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Fonts } from '../../utils/Constants';
import CustomText from '../CustomText';
const Pedometer = ({onCross}) => {
const {stepCount,dailyGoal,addSteps}= usePedometer()
StepCounter.addListener('StepCounter.stepsSensorInfo')
const startStepCounter=()=>{
    startStepCounterUpdate(new Date(),(data)=>{
        const parsedData= parseStepData(data)
        addSteps(parsedData.steps,parsedData.distance)
    })
}

const stopStepCounter=()=>{
    stopStepCounterUpdate()
}
useEffect(()=>{
    if(stepCount>= dailyGoal){
        SpeakTTS("You have reached to your daily goal")
    }else{
        startStepCounter()
    }

    return()=>stopStepCounter()
})

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cross} onPress={onCross}>
        <Icons name="close-circle" color={'red'} size={RFValue(20)} />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/logo_short.png')}
        style={styles.logo}
      />
      <View style={styles.indicator}>
      <CircularProgress
      value={stepCount}
      maxValue={dailyGoal}
      valueSuffix='/2000'
      progressValueFontSize={22}
      radius={120}
      activeStrokeColor='#cdd27e'
      activeStrokeWidth={20}
      inActiveStrokeColor='#4c6394'
      inActiveStrokeOpacity={0.5}
      inActiveStrokeWidth={20}
      title='Steps'
      titleColor='#555'
      titleFontSize={22}
        titleStyle={{fontFamily:Fonts.SemiBold}}
      />
      
      </View>
      <CustomText fontFamily={Fonts.Medium} fontSize={RFValue(10)} style={{marginTop:20, textAlign:"center",}}>Start movie counter will update</CustomText>
    </View>
  );
};

export default Pedometer;

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
  indicator:{
    marginTop:10,
    marginBottom:20,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center"
  }
});
