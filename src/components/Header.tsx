import * as React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {history} from '../store/store'


export default class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            isOpen: false
        };
    }

    public toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public logout() {
        /* tslint:disable:no-string-literal */
        // remove all front-end cookie or remove as you want
        // document.cookie.split(";").forEach((c) => { window['eraseCookieFromAllPaths'](c) })
        window['eraseCookieFromAllPaths']('isLoggedin');
        // call logout-action  to capture from where which URL (path) logout is called. pass null to set /(index) as from url.
        this.props.logout(null);
        history.push('/login');
        /* tslint:disable:no-string-literal */
    }

    public render() {

        if (this.props.pathname.substring(1) !== 'login') {
            return (
                <div className="Header-component">
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">Github User Repo Dashboard</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Settings
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem onClick={this.logout}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        } else {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">Github User Repo Dashboard</NavbarBrand>
                    </Navbar>
                </div>
            );
        }
    }
}
