import * as constants from '../constants';

// only for redirection on same page
export interface FetchGithubOrgStart {
    type: constants.FETCH_GITHUB_ORG_START
}
// will actually call API
export interface FetchGithubOrg {
    type: constants.FETCH_GITHUB_ORG_DETAILS,
    GithubOrgName: string
}

export interface FetchGithubOrgFulfilled {
    type: constants.FETCH_GITHUB_ORG_DETAILS_FULFILLED,
    GithubOrgDetails: object
}

export interface FetchGithubOrgCancel {
    type: constants.FETCH_GITHUB_ORG_DETAILS_CANCEL
}

export interface FetchGithubOrgFailed {
    type: constants.FETCH_GITHUB_ORG_DETAILS_FAILED
}


export function fetchGithubOrgStart ():FetchGithubOrgStart  {
    return {
        type: constants.FETCH_GITHUB_ORG_START,
    }
}

export function fetchGithubOrg (GithubOrgName: string):FetchGithubOrg  {
    return {
        type: constants.FETCH_GITHUB_ORG_DETAILS,
        GithubOrgName
    }
}

export function fetchGithubOrgFulfilled (GithubOrgDetails: object):FetchGithubOrgFulfilled  {
    return {
        type: constants.FETCH_GITHUB_ORG_DETAILS_FULFILLED,
        GithubOrgDetails
    }
}

export function fetchGithubOrgCancel ():FetchGithubOrgCancel  {
    return {
        type: constants.FETCH_GITHUB_ORG_DETAILS_CANCEL,
    }
}

export function fetchGithubOrgFailed ():FetchGithubOrgFailed  {
    return {
        type: constants.FETCH_GITHUB_ORG_DETAILS_FAILED,
    }
}

export type AllAction =  FetchGithubOrgStart | FetchGithubOrg | FetchGithubOrgFulfilled | FetchGithubOrgCancel | FetchGithubOrgFailed ;

