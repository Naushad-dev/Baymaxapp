import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import Baymax from '../screens/Baymax';
import { navigationRef } from '../utils/NavigationUtils';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="splash" component={Splash} options={{headerShown:false}} />
        <Stack.Screen name="baymax" component={Baymax} options={{animation:'fade_from_bottom',headerShown:false}} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
