import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {circleRadius, Colors} from '../../../utils/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const OptionItem = ({item, onPress}) => {
  // console.log(item);

  let iconName;
  let iconColor;

  switch (item) {
    case 'meditation':
      iconName = 'nature-people';
      iconColor = '#2DEC72';
      break;
    case 'happiness':
      iconName = 'emoji-emotions';
      iconColor = '#FB26FF';
      break;

    case 'health':
      iconName = 'health-and-safety';
      iconColor = 'green';
      break;
    case 'pedometer':
      iconName = 'directions-run';
      iconColor = '#2d7ba4';
      break;
    default:
      iconName = 'local-fire-department';
      iconColor = '#FFBc66';
      break;
  }

  return (
    <TouchableOpacity style={styles.ItemCircle} onPress={()=>onPress(item)}>
      <MaterialIcons name={iconName} color={iconColor} size={RFValue(32)} />
    </TouchableOpacity>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  ItemCircle: {
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
});
