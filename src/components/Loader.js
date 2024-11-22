import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loader = () => {
  return (
    <LottieView source={require('../assets/animations/sync.json')} style={{height:100, width:220}} autoPlay loop/>
  )
}

export default Loader

const styles = StyleSheet.create({})