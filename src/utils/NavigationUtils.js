import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationRef= createNavigationContainerRef();

export async function navigate(routName, params){
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.navigate(routName,params))
    }
}

export async function resetAndNavigate(routName)
{

    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.reset({
            index:0,
            routes:[{name:routName}]
        }))
    }
}