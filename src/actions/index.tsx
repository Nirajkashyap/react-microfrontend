import * as constants from '../constants';

export interface LoginStart {
    type: constants.LOGIN_START;
    user: {
        username:string,
        password:string
    }
}

export interface LoginFullfilled {
    type: constants.LOGIN_FULLFILLED
}

export interface Logout {
    type: constants.LOGOUT
    from: object
}

export function loginStart (username:string,password:string):LoginStart  {
    return {
        type: constants.LOGIN_START,
        user: {username,password}
    }
}

export function loginFullfilled ():LoginFullfilled  {
    return {
        type: constants.LOGIN_FULLFILLED
    }
}

export function logout (from : object):Logout  {
    return {
        type: constants.LOGOUT,
        from
    }
}



export type AllAction =  LoginStart | LoginFullfilled | Logout;
