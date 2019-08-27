import * as constants from '../constants';

// only for redirection on same page
export interface FetchGithubUserStart {
    type: constants.FETCH_GITHUB_USER_START
}
// will actually call API
export interface FetchGithubUser {
    type: constants.FETCH_GITHUB_USER_DETAILS,
    GithubUserName: string
}

export interface FetchGithubUserFulfilled {
    type: constants.FETCH_GITHUB_USER_DETAILS_FULFILLED,
    GithubUserDetails: object
}

export interface FetchGithubUserCancel {
    type: constants.FETCH_GITHUB_USER_DETAILS_CANCEL
}

export interface FetchGithubUserFailed {
    type: constants.FETCH_GITHUB_USER_DETAILS_FAILED
}


export function fetchGithubUserStart ():FetchGithubUserStart  {
    return {
        type: constants.FETCH_GITHUB_USER_START,
    }
}

export function fetchGithubUser (GithubUserName: string):FetchGithubUser  {
    return {
        type: constants.FETCH_GITHUB_USER_DETAILS,
        GithubUserName
    }
}

export function fetchGithubUserFulfilled (GithubUserDetails: object):FetchGithubUserFulfilled  {
    return {
        type: constants.FETCH_GITHUB_USER_DETAILS_FULFILLED,
        GithubUserDetails
    }
}

export function fetchGithubUserCancel ():FetchGithubUserCancel  {
    return {
        type: constants.FETCH_GITHUB_USER_DETAILS_CANCEL,
    }
}

export function fetchGithubUserFailed ():FetchGithubUserFailed  {
    return {
        type: constants.FETCH_GITHUB_USER_DETAILS_FAILED,
    }
}

export type AllAction =  FetchGithubUserStart | FetchGithubUser | FetchGithubUserFulfilled | FetchGithubUserCancel | FetchGithubUserFailed ;

