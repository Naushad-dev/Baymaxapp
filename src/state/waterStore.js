import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

import { mmkvStorage } from './store'
export const useWaterStore=create(
    persist(
        (set,get)=>({
            waterDrinkTimeStamp:[],
            addWaterIntake:(timestamp)=>{
                const waterDrinkTimeStamp= [...get().waterDrinkTimeStamp,timestamp]
                set({waterDrinkTimeStamp})

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