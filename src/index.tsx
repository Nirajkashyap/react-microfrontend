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
window['ReactDOM'] = ReactDOM;
window['React'] = React;
window['react-redux'] = react_redux;
window['redux'] = redux;
window['reactstrap'] = reactstrap;
window['qs'] = qs;
window['reacthistory'] = history;
window['rxjs'] = rxjs;
window['redux-observable'] = redux_observable;
window['rxoperators'] = rxoperators;

window['appPaths'] = {};
// define any url path runtime and load it's rollup react component module runtime
// example > below
window['appPaths']['org'] =  {
    src : 'http://localhost:8082/static/js/assets/Org.module.js',
    isLoaded : false,
    exposedModule : null
};



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
