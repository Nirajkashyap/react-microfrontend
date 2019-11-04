import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ConnectedRouter} from 'connected-react-router'
import {Provider} from 'react-redux';
import { history, store  } from './store/store'
import './index.css';
import routes from './router'
import ErrorBoundary from './ErrorBoundary'

import 'bootstrap/dist/css/bootstrap.min.css';

import * as react_redux from 'react-redux';
import * as redux from 'redux';
import * as reactstrap from 'reactstrap';
import * as qs from 'query-string';
import * as rxjs from 'rxjs';
import * as redux_observable from 'redux-observable';
import * as rxoperators from 'rxjs/operators';

/* tslint:disable:no-string-literal */
let microFrontendReactV16 = {};
microFrontendReactV16 = {};

microFrontendReactV16['ReactDOM'] = ReactDOM;
microFrontendReactV16['React'] = React;
microFrontendReactV16['react-redux'] = react_redux;
microFrontendReactV16['redux'] = redux;
microFrontendReactV16['reactstrap'] = reactstrap;
microFrontendReactV16['qs'] = qs;
microFrontendReactV16['reacthistory'] = history;
microFrontendReactV16['rxjs'] = rxjs;
microFrontendReactV16['redux-observable'] = redux_observable;
microFrontendReactV16['rxoperators'] = rxoperators;

Object.defineProperty(window, "microFrontendReactV16", {
    value: Object.freeze(microFrontendReactV16),
    writable: false

});

window['appPaths'] = {};
// define any url path runtime and load it's rollup react component module runtime
// example > below
window['appPaths']['/org'] =  {
    src : 'http://localhost:8082/static/js/assets/Org.module.js',
    isLoaded : false,
    exposedModule : null,
    moduleComponent : 'index',
    isCookieSecure : true
};
if(process.env.REACT_APP_SUB_MODULE === "true"){
    window['appPaths']['/org'].src = 'https://nirajkashyap.github.io/react-microfrontend-submodule/static/js/assets/Org.module.js'
      
}
// new entry
window['appPaths']['/org/testpage'] =  {
    src : 'http://localhost:8082/static/js/assets/Org.module.js',
    isLoaded : false,
    exposedModule : null,
    moduleComponent : 'testpage',
    isCookieSecure : false
};
if(process.env.REACT_APP_SUB_MODULE === "true"){
    window['appPaths']['/org/testpage'].src = 'https://nirajkashyap.github.io/react-microfrontend-submodule/static/js/assets/Org.module.js'
      
}

window['eraseCookieFromAllPaths'] = (name) => {
    // This function will attempt to remove a cookie from all paths.
    const pathBits = location.pathname.split('/');
    let pathCurrent = ' path=';

    // do a simple pathless delete first.
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

    for (const temp of pathBits) {
        pathCurrent += ((pathCurrent.substr(-1) !== '/') ? '/' : '') + temp;
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
    }
}


window['appendStyle'] =  (styles)=>{

    const head = document.head || document.getElementsByTagName('head')[0];
    const styleTag = document.createElement('style');

    head.appendChild(styleTag);

    styleTag.type = 'text/css';
    if (styleTag['styleSheet']){
        // This is required for IE8 and below.
        styleTag['styleSheet'].cssText = styles;
    } else {
        styleTag.appendChild(document.createTextNode(styles));
    }
};

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store} >
            <ConnectedRouter history={history}>
                { routes }
            </ConnectedRouter>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('root') as HTMLElement
);

// import registerServiceWorker from './registerServiceWorker';
//
// registerServiceWorker();
/* tslint:disable:no-string-literal */
