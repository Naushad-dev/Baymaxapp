import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

import { mmkvStorage } from './store'
import { displayNotifications } from '../notification/notificationInitial'
export const useWaterStore=create(
    persist(
        (set,get)=>({
            waterDrinkTimeStamp:[],
            addWaterIntake:(timestamp)=>{
                const waterDrinkTimeStamp= [...get().waterDrinkTimeStamp,timestamp]
                set({waterDrinkTimeStamp})
                displayNotifications(`Water Intake ${waterDrinkTimeStamp}/8`,
                    'Stay Hydrated',
                    require("../assets/images/water.png"),
                    'water-intake'
                )

            },
            resetWaterIntake:()=>{
                set({waterDrinkTimeStamp:[]})
            }
        }),
        {
            name:'water-storage',
            storage:createJSONStorage(()=>mmkvStorage)
        }
    )
)