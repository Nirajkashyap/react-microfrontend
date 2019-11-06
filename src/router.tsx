/* tslint:disable:no-string-literal */
import * as React from 'react';

import {Route, Switch, Redirect} from 'react-router'

import Header from './containers/Header';
import Sidebar from './containers/SideBar';

import Login from './containers/Login';
import Landing from './containers/Landing';

import NoMatch from './components/NoMatch';
// import Org from './components/Org';

import './router.scss';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function cloneObject(obj) {
    const clone = {};
    for(const i in obj) {
        if(obj[i] != null &&  typeof(obj[i]) === "object") {
            clone[i] = cloneObject(obj[i]);
        } else {
            clone[i] = obj[i];
        }
    }
    return clone;
}


const asyncComponent = (importComponent) => {
    return class extends React.Component<any, any> {
        public state   : { component : any  , componentData : any}= {
            component :  null,
            componentData : null
        };
        public componentDidMount() {
            // console.log(importComponent);
            console.log(this.props.passedProps.location.pathname);

            const key = this.props.passedProps.location.pathname;
            const runtimePathUrl = window['appPaths'][key]['src'];
            console.log('script location for  ' + key + ' is : ' ,  runtimePathUrl);

            const scriptSource = document.createElement('script');
            scriptSource.src = runtimePathUrl;

            scriptSource.onload = () => {

                try{

                    window['appPaths'][key]['isLoaded'] = true;

                    // deep copy object from tempLazyLoaded and flush tempLazyLoaded
                    console.log('tempLazyLoaded object from script ' ,  window['tempLazyLoaded']);
                    window['appPaths'][key]['exposedModule'] =  cloneObject(window['tempLazyLoaded']);
                    console.log(window['appPaths'][key]);

                    const cmpDefinition = window['appPaths'][key]['exposedModule'][window['appPaths'][key]['moduleComponent']];
                    this.setState({component: cmpDefinition , componentData : this.props.passedProps});

                    // below is old one
                    // Very IMP to decide which cmp to render after script is loaded if script expose only single module after rollup
                    // than use below thing as it is
                    // this.setState({component: window[this.props.passedProps.location.pathname.split("/")[1]]});
                    // otherwise use relative cmp  from exposedModule in window

                }catch (e) {
                    console.log(e);
                    window['appPaths'][key]['isLoaded'] = false;
                    this.setState({component: "error"});
                }


            };
            if(document.head){
                document.head.appendChild(scriptSource);
            }

            // importComponent()
            //     .then(cmp => {
            //         this.setState({component: cmp.default});
            //  });
        }

        public render() {

            if(this.state.component){
                if(this.state.component !== 'error'){

                    const C  =  this.state.component;
                    console.log("componentData ", this.props);
                    return  <C {...this.props}/>

                }else{
                    return <div> error in loading component</div>
                }

            }else{
                return <div> loading component</div>
            }

        }
    }
};
window['asyncComponent'] = asyncComponent;


const AsyncPrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {

            console.log(props);

            // props.location.pathname indexOf can load main module and main module can return relative cmp
            const key = props.location.pathname;
            console.log('current runtime paths are ' , window['appPaths']);
            console.log('value for this path : ' + key + ' is : ' , window['appPaths'][key]);

            const runtimePath = window['appPaths'][key];

            if (runtimePath) {

                if(runtimePath['isCookieSecure']){

                    if(cookies.get('isLoggedin')){
                            // console.log('continue  with flow');

                            // caching control
                            if(runtimePath['isLoaded'] ){
                                // decide which cmp to return from exposedModule
                                // console.log(window['appPaths'][key]);
                                
                                const tempCmp =  window['appPaths'][key]['exposedModule'][window['appPaths'][key]['moduleComponent']];
                                // console.log(tempCmp);
                                const Cmp = React.createElement(tempCmp, props, null);
                                console.log('component definition form caching ' , Cmp);
                                
                                return Cmp;
                                       
                            // return   window['appPaths'][key]['exposedModule']['index'];

                            }else{
                                const AsyncCmp = asyncComponent(() => {
                                    return import('./components/NoMatch');
                                });

                                return <AsyncCmp passedProps={props}/>
                                        
                            }

                    }else{
                        console.log('runtime path is defined and path(url) is CookieSecure but user has not logged-in. so redirecting to root path');
                        return <Redirect
                                    to={{
                                        pathname: "/",
                                        state: {from: props.location}
                                    }}
                                />
                    }

                }else{

                    // caching control
                    if(runtimePath['isLoaded'] ){
                        // decide which cmp to return from exposedModule
                        console.log(window['appPaths'][key]);
                        
                        const tempCmp =  window['appPaths'][key]['exposedModule'][window['appPaths'][key]['moduleComponent']];
                        // console.log(tempCmp);
                        const Cmp = React.createElement(tempCmp, props, null);
                        console.log('component definition form caching ' , Cmp);
                        
                        return Cmp;
                                

                    }else{
                        const AsyncCmp = asyncComponent(() => {
                            return import('./components/NoMatch');
                        });

                        return (<div>
                                    <AsyncCmp passedProps={props}/>
                                </div>)
                    }
                }

                
            } else {
                console.log('runtime path is not defined redirecting to root path');
                return <Redirect
                    to={{
                        pathname: "/",
                        state: {from: props.location}
                    }}
                />

            }
        }
        }
    />
);

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if (cookies.get('isLoggedin')) {
                return <Component {...props} />
            } else {
                // handle redirect url after login in query string or state ( below state is used )
                return <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            }
        }
        }
    />
);

const routes = (

    <div className="contained-css">
        <Header/>

        <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <Switch>
                    {<Route exact path="/" render={(props) =>
                        <Redirect
                            to={{
                                pathname: "/search"
                            }}
                        />
                    }/>}
                    <Route path="/login" component={Login}/>

                    <PrivateRoute path="/search" component={Landing}/>

                    {/*<PrivateRoute exact path="/random" component={Org}/>*/}
                    <AsyncPrivateRoute  component={NoMatch}/>
                </Switch>

            </div>
        </div>

    </div>
);

export default routes
/* tslint:disable:no-string-literal */
