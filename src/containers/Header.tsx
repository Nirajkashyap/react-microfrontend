import { connect } from 'react-redux';
import Header from "../components/Header";
import {Dispatch} from "redux";
import * as actions from '../actions/';

export function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AllAction>) {
    return {
        logout: (from : object) => dispatch(actions.logout(from)),

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
