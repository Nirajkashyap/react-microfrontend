/* tslint:disable:no-string-literal */
import {createStore, applyMiddleware , combineReducers } from 'redux';
import {routerMiddleware, connectRouter} from 'connected-react-router'
import {createBrowserHistory, createHashHistory} from 'history'
import {createEpicMiddleware, combineEpics} from 'redux-observable';
// import {RouterState} from 'connected-react-router'
import {composeWithDevTools} from 'redux-devtools-extension';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import {
    loginEpic,
    fetchGithubUserEpic,
    fetchGithubUserReposEpic
} from '../epic/';

import {rootReducerTree, rootReducer} from '../reducers/index'

// const epicMiddleware = createEpicMiddleware();
const epicMiddleware = createEpicMiddleware<any, any, any, any>();

let historyObj;
if(process.env.REACT_APP_HASH_HISTORY === "true"){
    historyObj = createHashHistory({
        basename: '', // The base URL of the app (see below)
        hashType: 'slash', // The hash type to use (see below)
        // A function to use to confirm navigation with the user (see below)
        
      });
      
}else{
    
    historyObj = createBrowserHistory();
}

export const history = historyObj

const epicRegistry = [loginEpic, fetchGithubUserEpic];
window['epicRegistry'] = epicRegistry;
export const epic$ = new BehaviorSubject(combineEpics(
    loginEpic,
    fetchGithubUserEpic,
    fetchGithubUserReposEpic

));


const rootEpic = (action$, state$) => epic$.pipe(
    mergeMap(epic => {
        // console.log(epic);
        return epic(action$)
    })
);

window['epic$'] = epic$;


const logger = storeobj => next => action => {
    console.group(action.type);
    console.info('dispatching', action)
    const result = next(action);
    console.log('next state', storeobj.getState());
    console.groupEnd();
    return result
};

const middlewares = () => {
    return process.env.NODE_ENV === "development" ?
        [epicMiddleware, logger] :
        [epicMiddleware];
};

const composeEnhancers = composeWithDevTools({})

const enhancer = composeEnhancers(applyMiddleware(...middlewares(), routerMiddleware(history)));

export function configureStore(initialState) {

    const storeX = createStore(connectRouter(history)(rootReducer), initialState, enhancer);

    // Add a dictionary to keep track of the registered async reducers



    storeX['asyncReducers'] = {};
    Object.keys(rootReducerTree).forEach(key => {
        const value = rootReducerTree[key];
        console.log(value);
        storeX['asyncReducers'][key] = value
    });
    console.log(storeX['asyncReducers']);



    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    storeX['injectReducer'] = (key, asyncReducer) => {

        storeX['asyncReducers'][key] = asyncReducer;
        const newRootReducer = createReducer(storeX['asyncReducers']);
        console.log(newRootReducer);
        storeX.replaceReducer(connectRouter(history)(newRootReducer));
    };

    // Return the modified store
    return storeX
}
export const store = configureStore({});
epicMiddleware.run(rootEpic);


window['store'] = store;

function createReducer(oldRootreducer) {
    console.log(oldRootreducer);
    // const newRootReducer = combineReducers({
    //         ...oldRootreducer,
    //     ...newAsyncReducer
    // });
    const newRootReducer = combineReducers(oldRootreducer);

    return newRootReducer

}
/* tslint:disable:no-string-literal */
