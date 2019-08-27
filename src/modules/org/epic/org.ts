import { ofType } from 'redux-observable';
import { concat } from 'rxjs';
import * as rxoperators from 'rxjs/operators';


// import  constant
import { FETCH_GITHUB_ORG_DETAILS , FETCH_GITHUB_ORG_DETAILS_CANCEL  } from '../constants';
// import type and // import method
import { FetchGithubOrg, fetchGithubOrgFulfilled    } from '../actions/org';

/* tslint:disable:no-string-literal */
const getRequest = window['apiClient']['getRequest'];

export function apiLocation() {
    return 'https://api.github.com' || 'http://localhost:4001' ;
}

export const fetchGithubOrgEpic = (action$ : any) => {
    return action$.pipe(
        ofType(FETCH_GITHUB_ORG_DETAILS),
        rxoperators.mergeMap(mergeResponse));

    function mergeResponse(action : FetchGithubOrg) {
        return getRequest({
                url:`${apiLocation()}/orgs/${action.GithubOrgName}`,
                withCredentials : false,
            },fetchGithubOrgFulfilled,
            (err) => {

                console.log(err);
                return concat([{ type : 'FETCH_GITHUB_ORG_DETAILS_FAILED'}]);
            }
            ,action$, [FETCH_GITHUB_ORG_DETAILS_CANCEL]);
    }
};

export const fetchGithubOrgNewEpic = (action$ : any) => {
    return action$.pipe(
        ofType(FETCH_GITHUB_ORG_DETAILS),
        rxoperators.mergeMap(mergeResponse));

    function mergeResponse(action : FetchGithubOrg) {
        return getRequest({
                url:`${apiLocation()}/orgs/${action.GithubOrgName}`,
                withCredentials : false,
            },fetchGithubOrgFulfilled,
            (err) => {

                console.log(err);
                return concat([{ type : 'FETCH_GITHUB_ORG_DETAILS_FAILED'}]);
            }
            ,action$, [FETCH_GITHUB_ORG_DETAILS_CANCEL]);
    }
};
