import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../actions/org';
import OrgDetails from "../components/OrgDetails";

export function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        hash: state.router.location.hash,
        githubOrgLoading: state.orgReducer.githubOrgLoading,
        githubOrgName : state.orgReducer.githubOrgName,
        githubOrgDetails : state.orgReducer.githubOrgDetails,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AllAction>) {
    return {
        fetchGithubOrgStart: () => dispatch(actions.fetchGithubOrgStart()),
        fetchGithubOrgCancel:() => dispatch(actions.fetchGithubOrgCancel()),
        fetchGithubOrg: (githubOrgName : string) => dispatch(actions.fetchGithubOrg(githubOrgName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrgDetails);
