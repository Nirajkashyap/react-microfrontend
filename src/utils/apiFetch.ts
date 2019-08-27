import {   concat } from 'rxjs';
import { ajax} from 'rxjs/ajax';
import {map,catchError, takeUntil, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import {history} from '../store/store';
// import { Redirect} from 'react-router'

export function getRequest(requestOptions : any, recievingFunction: any, recievingErrorFunction : any = null, action$: any , cancelAction: any = [] ){

    const requestOptionsObj = {
        crossDomain: true,
        method: 'GET',
        withCredentials: true
    };
    const mergedRequestOptions = Object.assign(requestOptionsObj,requestOptions);
    const cancelArray = ['CANCEL_ALL_XHR'].concat(cancelAction);

    return ajax(mergedRequestOptions).pipe(
        map(response => {
            console.log(typeof  recievingFunction,  recievingFunction);
                return recievingFunction(response.response);
            }
        ),
        takeUntil(action$.pipe(
            filter((action: any) => {
                return (cancelArray.indexOf(action.type) > -1)
            })
        )),
        catchError(err =>{
            console.log(err);
            if(err.status === 401){
                // redirect to login
                // console.log(history);

                // return <Redirect                             to={{ pathname: "/login",state: {from: window.location}      }}      />
                console.log(history.location);
                const nextlocation  = history.location.pathname + history.location.search;
                // if redirection url want to set in query string than remove LOGOUT action from below
                // remove only related cookies for now we are removing all Front-end cookies
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });

                history.push('/login');

                return  concat([{ type : 'CANCEL_ALL_XHR'} , {type:'LOGOUT' , from : nextlocation}  ]);

            }else{
                if(typeof  recievingErrorFunction === 'function'){

                    return recievingErrorFunction(err);
                    // return of();
                }else{
                    return of();
                }
            }


        })
    );
}

export function postRequest(requestOptions : any, recievingFunction: any, recievingErrorFunction : any = null , action$: any , cancelAction: any = [] ){

    const requestOptionsObj = {
        crossDomain: true,
        method: 'POST',
        withCredentials: true
    };
    const mergedRequestOptions = Object.assign(requestOptionsObj,requestOptions);
    const cancelArray = ['CANCEL_ALL_XHR'].concat(cancelAction);

    return ajax(mergedRequestOptions).pipe(
        map(response => {
            if(requestOptions.url.indexOf('login')> -1){
                document.cookie = "isLoggedin=true";
            }
            return recievingFunction(response.response);
        }),
        takeUntil(action$.pipe(
            filter((action: any) => {
                return (cancelArray.indexOf(action.type) > -1)
            })
        )),
        catchError((err) =>{


            if(err.status === 401){
                // redirect to login
                // console.log(history);

                // return <Redirect                             to={{ pathname: "/login",state: {from: window.location}      }}      />
                const nextlocation  = history.location.pathname + history.location.search;
                // if redirection url want to set in query string than remove LOGOUT action from below
                // remove only related cookies for now we are removing all Front-end cookies
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                history.push('/login');
                return  concat([{ type : 'CANCEL_ALL_XHR'} , {type:'LOGOUT' , from : nextlocation}  ]);

            }else{
                if(typeof  recievingErrorFunction === 'function'){
                    console.log(err);
                    return recievingErrorFunction(err)
                }else{
                    return of();
                }

            }
        })
    );
}


/* tslint:disable:no-string-literal */
// expose api client

window['apiClient'] = {};

Object.defineProperty(window['apiClient'], "getRequest", {
    value: Object.freeze(getRequest),
    writable: false
});

Object.defineProperty(window['apiClient'], "postRequest", {
    value: Object.freeze(postRequest),
    writable: false

});


/* tslint:disable:no-string-literal */
