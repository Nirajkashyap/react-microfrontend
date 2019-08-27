import { combineReducers } from 'redux';

import {landingReducer} from "./landing";
import {loginReducer} from "./login"


export const rootReducerTree = {

     loginReducer,
     landingReducer

};

export const rootReducer  = combineReducers<any,any>(
    rootReducerTree
);
