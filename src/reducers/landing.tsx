import * as constants from '../constants'
import * as githubUseractions from '../actions/GithubUser';
import * as githubUserRepoactions from '../actions/GithubUserRepos';
import { Landing } from '../types/landing';

export function landingReducer(state : Landing = { githubUserName: "",githubUserLoading:false , githubUserDetails :{}, githubUserReposLoading :false,
    githubUserReposDetails : []}, action: githubUseractions.AllAction | githubUserRepoactions.AllAction): Landing {
    switch (action.type) {
        case constants.FETCH_GITHUB_USER_START :
            return {...state  ,githubUserLoading:true };
        case constants.FETCH_GITHUB_USER_DETAILS :
            return {...state  ,githubUserName : action.GithubUserName, githubUserLoading:false };
        case constants.FETCH_GITHUB_USER_DETAILS_FULFILLED :
            return {...state , githubUserDetails : action.GithubUserDetails ,githubUserLoading:false};
        case constants.FETCH_GITHUB_USER_DETAILS_CANCEL :
            return {...state , githubUserLoading:false};
        case constants.FETCH_GITHUB_USER_DETAILS_FAILED :
            return {...state , githubUserLoading:false};
        case constants.FETCH_GITHUB_USER_REPO_START :
            return {...state  ,githubUserReposLoading:true };
        case constants.FETCH_GITHUB_USER_REPO_DETAILS :
            return {...state  ,githubUserName : action.GithubUserName, githubUserReposLoading:false };
        case constants.FETCH_GITHUB_USER_REPO_FULFILLED :
            return {...state , githubUserReposDetails : action.GithubUserReposDetails ,githubUserReposLoading:false};
        case constants.FETCH_GITHUB_USER_REPO_CANCEL :
            return {...state , githubUserReposLoading:false};
        case constants.FETCH_GITHUB_USER_REPO_FAILED :
            return {...state , githubUserReposLoading:false};
        default:
            return state;
    }

}
