import notifee, {AndroidImportance, RepeatFrequency, TriggerType} from '@notifee/react-native';

export const createTimeStampNotification = async (
  imageUri,
  title,
  body,
  hour,
  minute,
  notificationID,
) => {
  const now = new Date();
  const triggerDate = new Date();

  triggerDate.setHours(hour, minute, 0, 0);
  if (triggerDate <= now) {
    triggerDate.setDate(triggerDate.getDate() + 1);
  }

  // Create a time-based trigger
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    repeareFrequency: RepeatFrequency.DAILY,
    alarmManager: true,
  };
  const action = {
    title: 'View Details',
    pressAction: {
      id: 'view details',
      launchActivity: 'default',
    },
  };

  await notifee.createTriggerNotification(
    {
      id: notificationID,
      title,
      body,
      android: {
        channelId: 'default',
        sound: 'notification',
        onlyAlertOnce: true,
        smallIcon: 'ic_stat_name',
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: imageUri || require('../assets/images/launch.png'),
        },
        actions: [action],
      },
      ios: {
        categoryId: 'default',
        attachments: [
          {
            url: imageUri || require('../assets/images/launch.png'),
            thumbnailHidden: true,
          },
        ],
        interruptionLevel: 'timeSensitive',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    },
    trigger,
  );
};

export const createIntervalNotification = async (
    imageUri,
    title,
    body,
  intervalTime,
  timeUnit
  ) => {
    
    // Create a time-based trigger
    const trigger = {
      type: TriggerType.INTERVAL,
    interval:intervalTime,
    timeUnit:timeUnit
    };
    const action = {
      title: 'View Details',
      pressAction: {
        id: 'view details',
        launchActivity: 'default',
      },
    };
  
    await notifee.createTriggerNotification(
      {
    
        title,
        body,
        android: {
          channelId: 'default',
          sound: 'notification',
          onlyAlertOnce: true,
          smallIcon: 'ic_stat_name',
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: imageUri || require('../assets/images/launch.png'),
          },
          importance:AndroidImportance.HIGH
          
        },
        ios: {
          categoryId: 'default',
          attachments: [
            {
              url: imageUri || require('../assets/images/launch.png'),
              thumbnailHidden: true,
            },
          ],
          interruptionLevel: 'timeSensitive',
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
      },
      trigger,
    );
  };
  
