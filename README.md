[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Nirajkashyap/react-microfrontend/blob/master/LICENSE) 
[![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/Nirajkashyap/react-microfrontend)
[![Build Status](https://travis-ci.org/Nirajkashyap/react-microfrontend.svg?branch=master)](https://travis-ci.org/Nirajkashyap/react-microfrontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Nirajkashyap_react-microfrontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=Nirajkashyap_react-microfrontend)
[![HitCount](http://hits.dwyl.io/Nirajkashyap/react-microfrontend.svg)](http://hits.dwyl.io/Nirajkashyap/react-microfrontend)

MicroFrontend Reading: <br>
* Must Read : https://martinfowler.com/articles/micro-frontends.html @ThoughtWorks <br>
* https://hasgeek.com/reactfoo/2019-delhi/proposals/micro-frontend-architecture-a-case-study-of-the-fi-sP8U2fGsvBgu3vi9m6cF8R @walmart & @hasgeek <br>
* presentation https://drive.google.com/file/d/1_qr-U2JwF6LP0aom7CKaOD3BlOFWK5aP/view @walmart - Why not React Loadables <br>
* https://dev.to/dabit3/building-micro-frontends-with-react-vue-and-single-spa-52op  React + Vue <br>
* https://www.xenonstack.com/insights/what-is-micro-frontend/ <br>
* presentation  : https://speakerdeck.com/naltatis/micro-frontends-building-a-modern-webapp-with-multiple-teams <br>
* https://dev.to/phodal/micro-frontend-architecture-in-action-4n60 <br>

other links:<br>
* https://github.com/micro-frontends-demo <br>
* https://github.com/phodal/mooa <br>
* https://github.com/CanopyTax/single-spa <br>
* https://github.com/PlaceMe-SAS/single-spa-angular-cli-examples <br>


Problems <br> 
1. PayloadSize https://martinfowler.com/articles/micro-frontends.html#PayloadSize of each sub module <b>and</b> developing independent sub module repo <br>

2. Modify react object can break sub module code base in https://demo.microfrontends.com/ from https://martinfowler.com/articles/micro-frontends.html#TheExampleInDetail @ThoughtWorks <br>
![DemoMicroFrontEnd](/DemoMicroFrontEnd.png)


Solutions : <br>
1. Decrease PayloadSize by <b><i> main code base : [extracting react libs](./scripts/rollup.build.js) </i></b> from other sub module using rollup <br>

2. [Freeze React lib objects ](./src/index.tsx) like below
```javascript
let microFrontendReactV16 = {};

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

```

<h1> updates after typescript Create React App CLI base app </h1> 

1. <b>dynamic-import and code splitting</b><br>
<b> <i> problems : </i> </b> <br>
* dynamic-import from url was not working. 
        
```javascript
        import('https://otherhost.com/someother.js') 
```

* reference : https://github.com/tc39/proposal-dynamic-import  <br>

<b> <i> solutions : </i> </b> <br>

  get react component code only and don't load react lib use <a href="https://rollupjs.org/guide/en/">rollup</a> for this.
  example : 
  * Dynamic ( runtime + lazy ) javascript loading ![rollup Build code ](/rollupBuild.gif) <br><br>
  * Only sub module of components and no react lib codebase ![rollup Build code ](/subModule.gif)

  [Dynamic route declaration](./src/index.tsx) by window appPaths <br> 
  [routing code base](./src/router.tsx) for code-splitting <br>
  [rollup script](./scripts/rollup.build.js) to build sub module of components <br><br>
 
2.Default scss loader added in webpack config and [scss validator script](./scripts/scss.js) is added in [build process](https://github.com/Nirajkashyap/react-microfrotend/blob/b920d7dc720819a6a027d7cd9ae1ed7e536857c1/scripts/build.js#L116) <br><br> 


3.Some Env used in project<br> 
* REACT_APP_SUB_MODULE - used for defining javascript source url for SUB_MODULE - configured in travis ci env<br>
* REACT_APP_HASH_HISTORY -  used to decide which history object to use. example useful for build hash history for gh-pages  - configured in travis ci env<br>
* REACT_APP_API_URL - used to config api location <br>

## Available Scripts

### `npm run fullstart`   
run end to end application

live example : <br>
https://nirajkashyap.github.io/react-microfrontend/ from https://nirajkashyap.github.io/react-microfrontend/ <br> 
and sub module https://nirajkashyap.github.io/react-microfrontend-submodule/static/js/assets/Org.module.js is loaded from https://github.com/Nirajkashyap/react-microfrontend-submodule

[Create React App - README](./README-CRA.md)