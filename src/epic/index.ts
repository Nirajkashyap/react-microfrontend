import { ofType } from 'redux-observable';
import { of , concat } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
    LOGIN_START,
    FETCH_GITHUB_USER_DETAILS,
    FETCH_GITHUB_USER_DETAILS_CANCEL,
    FETCH_GITHUB_USER_REPO_DETAILS,
    FETCH_GITHUB_USER_REPO_CANCEL
} from '../constants';
// type import
import { LoginStart  } from '../actions/index';
// method import
// import { loginFullfilled } from '../actions/index';
import { FetchGithubUser, fetchGithubUserFulfilled    } from '../actions/GithubUser';
import { FetchGithubUserRepos, fetchGithubUserReposFulfilled    } from '../actions/GithubUserRepos';
import { getRequest , postRequest} from '../utils/apiFetch';

export function apiLocation() {
    return process.env.REACT_APP_API_URL || 'https://api.github.com' || 'http://localhost:4001' ;
}

export const loginEpic = (action$ : any) => {
    return action$.pipe(
        ofType(LOGIN_START),
        mergeMap((action:LoginStart)=>{
            return  postRequest({
                                    url:`${apiLocation()}/login`,
                                    body : {username:action.user.username,password:action.user.password},
                                    withCredentials : false
                                },
                                (response) => {

                                    console.log(response);
                                    document.cookie = "isLoggedin=true";
                                    return concat([{ type : 'LOGIN_FULLFILLED'}]);
                                } , () => {
                alert('invalid username or password but make cookie to explore auth url (path) and reload page');
                // remove below line
                document.cookie = "isLoggedin=true";
                return of();
                },
                action$)
        }));
};

export const fetchGithubUserEpic = (action$ : any) => {
    return action$.pipe(
        ofType(FETCH_GITHUB_USER_DETAILS),
        mergeMap(mergeResponse));

    function mergeResponse(action : FetchGithubUser) {
        return getRequest({
                url:`${apiLocation()}/users/${action.GithubUserName}`,
                withCredentials : false,
            },fetchGithubUserFulfilled,
            (err) => {

                console.log(err);
                return concat([{ type : 'FETCH_GITHUB_USER_DETAILS_FAILED'}]);
            }
            ,action$, [FETCH_GITHUB_USER_DETAILS_CANCEL]);
    }
};

export const fetchGithubUserReposEpic = (action$ : any) => {
    return action$.pipe(
        ofType(FETCH_GITHUB_USER_REPO_DETAILS),
        mergeMap(mergeResponse));

    function mergeResponse(action : FetchGithubUserRepos) {
        return getRequest({
                url:`${apiLocation()}/users/${action.GithubUserName}/repos`,
                withCredentials : false,
            },fetchGithubUserReposFulfilled,
            (err) => {

                console.log(err);
                return concat([{ type : 'FETCH_GITHUB_USER_REPO_FAILED'}]);
            }
            ,action$, [FETCH_GITHUB_USER_REPO_CANCEL]);
    }
};
