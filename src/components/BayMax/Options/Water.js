import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {circleRadius, Colors} from '../../../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {PlaySound} from '../../../utils/Sounds';
import {useWaterStore} from '../../../state/waterStore';

const Water = () => {
  const {waterDrinkTimeStamp, addWaterIntake} = useWaterStore();
  const totalSegments = 8;
  const completedSegments = waterDrinkTimeStamp.length;
  // console.log('completedSegment', completedSegments);

  const containerStyle = [
    styles.WaterCircle,
    completedSegments === totalSegments && styles.containerCompleted,
  ];
  const handlePress = async () => {
    if (completedSegments < totalSegments) {
      const timestamp = new Date().toISOString();
      addWaterIntake(timestamp);
    } else {
      Alert.alert('You have completed your daily intake !');
    }
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
      <Ionicons name="water" color="#1ca3ec" size={RFValue(32)} />
      <View style={styles.segmentContainer}>
        {Array.from({length: totalSegments}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              {
                backgroundColor:
                  completedSegments === totalSegments
                    ? '#00D100'
                    : index < completedSegments
                    ? '#1ca3ec'
                    : '#eee',

                transform: [
                  {rotate: `${(index * 360) / totalSegments}deg`},
                  {
                    translateX: circleRadius / 2 - 5,
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default Water;

const styles = StyleSheet.create({
  WaterCircle: {
    backgroundColor: Colors.white,
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 25,
  },
  containerCompleted: {
    shadowColor: 'yellow',
    elevation: 10,
  },
  segmentContainer: {
    position: 'absolute',
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    position: 'absolute',
    width: 8,
    height: 4,
    borderRadius: 2,
  },
});
