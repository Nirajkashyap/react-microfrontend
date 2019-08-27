import { connect } from 'react-redux';
import SideBar from "../components/SideBar";

export function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
    };
}


export default connect(mapStateToProps)(SideBar);