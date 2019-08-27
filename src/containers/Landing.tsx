import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as githubUseractions from '../actions/GithubUser';
import * as githubUserRepoactions from '../actions/GithubUserRepos';
import {Landing} from "../components/Landing";

export function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        hash: state.router.location.hash,
        githubUserLoading: state.landingReducer.githubUserLoading,
        githubUserName : state.landingReducer.githubUserName,
        githubUserDetails : state.landingReducer.githubUserDetails,
        githubUserReposLoading : state.landingReducer.githubUserReposLoading,
        githubUserReposDetails : state.landingReducer.githubUserReposDetails,
    };
}

// important note :
export function mapDispatchToProps(dispatch: Dispatch<githubUserRepoactions.AllAction | githubUseractions.AllAction>) {
    return {
        fetchGithubUserStart: () => dispatch(githubUseractions.fetchGithubUserStart()),
        fetchGithubUserCancel:() => dispatch(githubUseractions.fetchGithubUserCancel()),
        fetchGithubUser: (githubUserName : string) => dispatch(githubUseractions.fetchGithubUser(githubUserName)),
        fetchGithubUserReposStart: () => dispatch(githubUserRepoactions.fetchGithubUserReposStart()),
        fetchGithubUserReposCancel: () => dispatch(githubUserRepoactions.fetchGithubUserReposCancel()),
        fetchGithubUserRepos: (githubUserName: string) => dispatch(githubUserRepoactions.fetchGithubUserRepos(githubUserName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
