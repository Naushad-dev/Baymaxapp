/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging"
import { displayNotifications } from './src/notification/notificationInitial';

async function onMessageReceived(message){
    const{title,imageUrl,description}= message.data
    await displayNotifications(title,description,imageUrl,'fcm-message')
    console.log("Successfully send notification using FCM");
    

}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived)
AppRegistry.registerComponent(appName, () => App);
