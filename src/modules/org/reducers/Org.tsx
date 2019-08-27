import * as constants from '../constants'
import { AllAction } from '../actions/org';
import { Org } from '../types/Org';

export function orgReducer(state : Org = { githubOrgName: "",githubOrgLoading:false , githubOrgDetails :{}}, action: AllAction): Org {
    switch (action.type) {
        case constants.FETCH_GITHUB_ORG_START :
            return {...state  ,githubOrgLoading:true };
        case constants.FETCH_GITHUB_ORG_DETAILS :
            return {...state  ,githubOrgName : action.GithubOrgName, githubOrgLoading:false };
        case constants.FETCH_GITHUB_ORG_DETAILS_FULFILLED :
            return {...state , githubOrgDetails : action.GithubOrgDetails ,githubOrgLoading:false};
        case constants.FETCH_GITHUB_ORG_DETAILS_CANCEL :
            return {...state , githubOrgLoading:false};
        case constants.FETCH_GITHUB_ORG_DETAILS_FAILED :
            return {...state , githubOrgLoading:false};
        default:
            return state;
    }

}
