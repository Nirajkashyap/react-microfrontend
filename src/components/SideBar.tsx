import * as React from 'react';
import "./SideBar.scss"
import {history} from '../store/store'


export default class SideBar extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            sideBarLinks: [
                {path: 'search', name: 'Github User Repo'},
                {path: 'org', name: 'Github Organization '}
                ]
        }

    }

    public handleClick(type) {
        history.push('/' + type)
    }


    public render() {
        if(this.props.pathname.substring(1) !== 'login'){
            return (
                <div className="SideBar-cmp col-sm-3">
                    <div className="navbar-container">
                        <nav className="nav nav-pills flex-column">
                            {this.state.sideBarLinks.map((linkObject, index) => (

                                <a key={index}
                                   className={this.props.pathname.substring(1) === linkObject.path ? "nav-link active" : "nav-link"}
                                   onClick={() => this.handleClick(linkObject.path)}>{linkObject.name}</a>

                            ))}
                        </nav>
                    </div>
                </div>
            )
        }else{
            return null
        }
    }
}
