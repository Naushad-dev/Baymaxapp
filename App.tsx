import { View, Text, StatusBar, Platform } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import { PowerManagerPermission, RequestBatteryPersmission, RequestPermission } from './src/notification/notificationPermission'
import './src/notification/notificationListeners'
import { registerAllTriggers } from './src/notification/registerTriggers'
import { setCatrgories } from './src/notification/notificationInitial'

const App = () => {
const checkPermissions= async()=>{
 RequestPermission()
 registerAllTriggers()
 setCatrgories()
 if(Platform.OS== 'android'){
  RequestBatteryPersmission()
  PowerManagerPermission()
 }

}

useEffect(()=>{
  checkPermissions()
})

  return (
    <>
    <Navigation/>
    <StatusBar hidden/>
    </>
    
  )
}

export default App