import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./store";

export const usePedometer= create(
    persist((set,get)=>({
    stepCount:0,
    dailyGoal:2000,
    distance:'',
    startDate:new Date().toISOString().split('T')[0],
    initializeStepsForTheDay:()=>{
        const todayDate= new Date().toISOString().split('T')[0]
        const{startDate}= get()
        if(todayDate !== startDate){
            set({stepCount:0,startDate:todayDate,distance:''})
        }
    },
    addSteps:(steps,distance)=>{
        get().initializeStepsForTheDay()
        set((state)=>({
            stepCount:state.stepCount + steps,
            distance:distance
        }))

    },
    resetSteps:()=>set({stepCount:0}),
    setDailyGoal:(goal)=>set({dailyGoal:goal})

    }),
    {
    name:'pedometer-storage',
    storage:createJSONStorage(mmkvStorage)
}))