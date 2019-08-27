import * as constants from '../constants';

// only for redirection on same page
export interface FetchGithubUserReposStart {
    type: constants.FETCH_GITHUB_USER_REPO_START
}
// will actually call API
export interface FetchGithubUserRepos {
    type: constants.FETCH_GITHUB_USER_REPO_DETAILS,
    GithubUserName: string
}

export interface FetchGithubUserReposFulfilled {
    type: constants.FETCH_GITHUB_USER_REPO_FULFILLED,
    GithubUserReposDetails: object
}

export interface FetchGithubUserReposCancel {
    type: constants.FETCH_GITHUB_USER_REPO_CANCEL
}

export interface FetchGithubUserReposFailed {
    type: constants.FETCH_GITHUB_USER_REPO_FAILED
}


export function fetchGithubUserReposStart ():FetchGithubUserReposStart  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_START
    }
}

export function fetchGithubUserRepos (GithubUserName: string):FetchGithubUserRepos  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_DETAILS,
        GithubUserName
    }
}

export function fetchGithubUserReposFulfilled (GithubUserReposDetails: object):FetchGithubUserReposFulfilled  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_FULFILLED,
        GithubUserReposDetails
    }
}

export function fetchGithubUserReposCancel ():FetchGithubUserReposCancel  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_CANCEL,
    }
}

export function fetchGithubUserReposFailed ():FetchGithubUserReposFailed  {
    return {
        type: constants.FETCH_GITHUB_USER_REPO_FAILED,
    }
}

export type AllAction =  FetchGithubUserReposStart | FetchGithubUserRepos | FetchGithubUserReposFulfilled | FetchGithubUserReposCancel | FetchGithubUserReposFailed ;

