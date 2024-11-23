import notifee, { AndroidStyle } from '@notifee/react-native'
export const addBadgeCount= async ()=>{
    notifee.setBadgeCount(1).then(()=>console.log('Badge Count')
    )
}

export const displayNotifications = async (title,message, image, categoryId)=>{
const channelId= await notifee.createChannel({
    id:'default',
    name:'Default Channel',
    sound:'notification'
})


await notifee.displayNotification({
    title:title,
    body:message,
    android:{
        channelId:channelId,
        sound:'notification',
        onlyAlertOnce:true,
       smallIcon:'ic_stat_name',
        style:{
            type:AndroidStyle.BIGPICTURE,
            picture: image || require('../assets/images/launch.png')
        },actions:[
            {
                title:'okay',
                pressAction:{
                    id:categoryId,

                }
            }
        ]

    },
    ios:{
        categoryId:categoryId,
        attachments:[
            {url:image || require('../assets/images/launch.png'),
                thumbnailHidden:true
            }
        ],
        foregroundPresentationOptions:{
            badge:true,
            sound:true,
            banner:true,
            list:true
        }
    }
})
}


export const setCatrgories= async ()=>{
    await notifee.setNotificationCategories([
        {
        id:'water-intake',
        actions:[
            {
                id:'water-intake',
                title:'okey',
                foreground:true
            }

        ]
    },
    {
        id:'drink-action',
        actions:[
            {id:'drink-intake',
                title:'I Drank Water',
                foreground:true
            }
        ]
    }
])
}