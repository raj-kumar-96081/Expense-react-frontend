import { CLEAR_USER, SET_USER } from "./action";

//gets called everytime sipatch function is called
//Irrespective of the action and payload
export const userReducer=(state=null,action)=>{
    switch (action.type){
        //this action helps in login functionality
        case SET_USER:
            return action.payload;
        //this case helps in logout functionality
        case CLEAR_USER:
            return null;
        //this case hepls in handiling cases where user/Reducer
        // is invoked due to change in somoe other state variable
        //maintained by redux
        default:
            return state;
    }
};