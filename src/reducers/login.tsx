import * as constants from '../constants'
import { AllAction } from '../actions';
import { Login } from '../types/login';

export function loginReducer(state : Login = { loggedIn:false , from : null }, action: AllAction): Login {
    switch (action.type) {
        case constants.LOGIN_FULLFILLED :
            return {...state ,loggedIn:true};
        case constants.LOGOUT :
            return {...state ,loggedIn:false , from : action.from };
        default:
            return state;
    }
}

