import {usePedometer} from '../state/pedometerStore';
import {useWaterStore} from '../state/waterStore';
import {createTimeStampNotification} from './notificationUtils';
import notifee from "@notifee/react-native"


const INTERVAL_NOTIFICATION_ID= 'water-reminder'

const createHourlyReminders=async ()=>{
    const startHour= 9;
    const endHour= 23
    const interval= 2;
    let counter=1;
    for(let hour = startHour; hour<= endHour; hour+= interval){
        await createTimeStampNotification(
            require("../assets/images/water.png"),
            "Water Reminder",
            'Time to drink Water ! Keep up good Work',
            hour,
            0,
            `${INTERVAL_NOTIFICATION_ID}=${counter}`
        )
        counter++
    }


}

export const registerAllTriggers = async () => {
  const {waterDrinkTimeStamp, resetWaterIntake} = useWaterStore.getState();
  const {initializeStepsForTheDay} = usePedometer.getState();
  initializeStepsForTheDay();

  //GOOD MORNING MESSAGE
  createTimeStampNotification(
    require('../assets/images/gm.png'),
    'GOOD MORNING 😊',
    'Start your day with Fresh and charming mood',
    23,
    3,
    'GOOD-MORNING',
  );


  //WATER DRINK REMINDER
  if(waterDrinkTimeStamp.length !=8){
    await createHourlyReminders()
  }else{
    const notifications = await notifee.getTriggerNotifications()
    let counter=1
    for(const notification of notifications){
        if(notification.notification.id === `${INTERVAL_NOTIFICATION_ID}- ${counter}`){
            await notifee.cancelAllNotifications(notification.notification.id)
        }
        counter++
    }
  }

  //RESET WATER INTAKE EVERY DAY  WHEN APP IS OPENS

  const now= new Date()
  const currentDate= now.toISOString().split('T')[0]
  const isFromPrevDay= (timestamp)=>{
    if(timestamp.length ===0) return true;
    const lastTimeStamp = new Date(timestamp[timestamp.length - 1])
    const lastDate= lastTimeStamp.toISOString().split('T')[0]
    return lastDate !== currentDate
  }

  if(isFromPrevDay(waterDrinkTimeStamp)){
    resetWaterIntake()
  }
  
};
