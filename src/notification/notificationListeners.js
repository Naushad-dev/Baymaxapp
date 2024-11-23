import notifee, { EventType } from "@notifee/react-native"

notifee.onForegroundEvent(({type,detail})=>{
    switch(type){
        case EventType.ACTION_PRESS:
            if(detail.pressAction?.id === 'drink-action'){
                console.log('Drink Action')
            }
            if(detail.pressAction?.id === 'water-intake'){
                console.log('Water Intake Action')
            }
            break;
    }
})

notifee.onBackgroundEvent(({type, detail})=>{
    console.log("Notification type",type);
    console.log("Notification detail",detail);

    if(type === EventType.ACTION_PRESS &&  detail.pressAction.id === "DRINK ACTION BACKGROUND" ){
        console.log("DRINK ACTION BACKGROUND");
        
    }
    
})