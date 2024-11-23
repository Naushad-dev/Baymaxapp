import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import { RequestPermission } from './src/notification/notificationPermission'
import './src/notification/notificationListeners'
import { registerAllTriggers } from './src/notification/registerTriggers'

const App = () => {
const checkPermissions= async()=>{
 RequestPermission()
 registerAllTriggers()
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