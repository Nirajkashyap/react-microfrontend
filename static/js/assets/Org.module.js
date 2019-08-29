(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-redux'), require('redux-observable'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-redux', 'redux-observable', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global.Org = {}, global.React, global['react-redux'], global['redux-observable'], global.rxjs, global.rxoperators));
}(this, function (exports, React, reactRedux, reduxObservable, rxjs, rxoperators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var FETCH_GITHUB_ORG_START = 'FETCH_GITHUB_ORG_START';
    var FETCH_GITHUB_ORG_DETAILS = 'FETCH_GITHUB_ORG_DETAILS';
    var FETCH_GITHUB_ORG_DETAILS_FULFILLED = 'FETCH_GITHUB_ORG_DETAILS_FULFILLED';
    var FETCH_GITHUB_ORG_DETAILS_CANCEL = 'FETCH_GITHUB_ORG_DETAILS_CANCEL';
    var FETCH_GITHUB_ORG_DETAILS_FAILED = 'FETCH_GITHUB_ORG_DETAILS_FAILED';

    function fetchGithubOrgStart() {
        return {
            type: FETCH_GITHUB_ORG_START,
        };
    }
    function fetchGithubOrg(GithubOrgName) {
        return {
            type: FETCH_GITHUB_ORG_DETAILS,
            GithubOrgName: GithubOrgName
        };
    }
    function fetchGithubOrgFulfilled(GithubOrgDetails) {
        return {
            type: FETCH_GITHUB_ORG_DETAILS_FULFILLED,
            GithubOrgDetails: GithubOrgDetails
        };
    }
    function fetchGithubOrgCancel() {
        return {
            type: FETCH_GITHUB_ORG_DETAILS_CANCEL,
        };
    }

    /* tslint:disable:no-string-literal */
    var qs = window['qs'];
    var OrgDetails = /** @class */ (function (_super) {
        __extends(OrgDetails, _super);
        function OrgDetails(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                githubOrgName: "",
                hideShow: "hide",
            };
            _this.handleChange = _this.handleChange.bind(_this);
            _this.handleSubmit = _this.handleSubmit.bind(_this);
            _this.handleCancel = _this.handleCancel.bind(_this);
            return _this;
        }
        OrgDetails.prototype.handleCancel = function () {
            this.props.fetchGithubOrgCancel();
        };
        OrgDetails.prototype.handleChange = function (event) {
            if (event.target.value) {
                this.setState({ hideShow: "hide", githubOrgName: event.target.value });
            }
            else {
                this.setState({ hideShow: "show", githubOrgName: "" });
            }
        };
        OrgDetails.prototype.handleSubmit = function (event) {
            event.preventDefault();
            if (!this.state.githubOrgName) {
                this.setState({ hideShow: "show" });
            }
            else {
                // both below line of code are required to trigger api call from componentWillReceiveProps
                // this.props.fetchGithubOrgStart();
                console.log(this.props);
                window['reacthistory'].push('/org?githubOrgName=' + this.state.githubOrgName);
            }
        };
        /* componentWillReceiveProps will be never called as on handleSubmit we change route and its (loading js or creating new cmp) again
         // this will not work like regular react redux connected component )
        public componentWillReceiveProps( nextProps) {
            console.log(this.props  ,nextProps);
            // nextProps.githubOrgLoading flag is used when handleChange is called and will update state but we don't want to call api
            // when handleSubmit is called will update  nextProps.githubOrgLoading via action and then updating url that will trigger same cmp
            // and will go to  componentWillReceiveProps section
            if (nextProps.githubOrgLoading) {
                this.props.fetchGithubOrg(qs.parse(nextProps.location.search, {ignoreQueryPrefix: true}).githubOrgName);
            }

            if(qs.parse(this.props.search).githubOrgName !== qs.parse(nextProps.location.search).githubOrgName && !nextProps.githubOrgLoading){
                this.props.fetchGithubOrgStart();
            }
        }
        */
        OrgDetails.prototype.componentDidMount = function () {
            var githubOrgName = qs.parse(this.props.search, { ignoreQueryPrefix: true }).githubOrgName;
            if (githubOrgName) {
                this.setState({ githubOrgName: githubOrgName });
                // this.props.fetchGithubOrgStart();
                // console.log(qs);
                this.props.fetchGithubOrg(qs.parse(this.props.search, { ignoreQueryPrefix: true }).githubOrgName);
                console.log(this.props, this.state);
            }
        };
        OrgDetails.prototype.render = function () {
            var _this = this;
            return (React.createElement("div", { className: "OrgDetails-cmp" },
                React.createElement("div", { className: "search-css" },
                    React.createElement("h3", null,
                        React.createElement("span", { className: "badge badge-secondary" }, " Dashboard")),
                    React.createElement("br", null),
                    React.createElement("br", null),
                    React.createElement("form", { onSubmit: function (e) { return _this.handleSubmit(e); } },
                        React.createElement("div", { className: "input-group" },
                            React.createElement("input", { disabled: this.props.githubOrgLoading, type: "text", value: this.state.githubOrgName, onChange: this.handleChange, className: "form-control", placeholder: "github orgname", "data-toggle": "tooltip", "data-placement": "bottom", title: "Enter github orgname" }),
                            React.createElement("div", { className: "input-group-append" },
                                React.createElement("button", { className: "btn btn-outline-secondary", type: "submit" }, "Search"),
                                React.createElement("button", { onClick: this.handleCancel, className: "btn btn-outline-secondary", type: "button" }, "cancel"))),
                        React.createElement("div", { className: "alert alert-danger " + this.state.hideShow + " ", role: "alert" }, "Please enter github orgname."))),
                React.createElement("pre", null, JSON.stringify(this.props.githubOrgDetails, null, 2))));
        };
        return OrgDetails;
    }(React.Component));

    function mapStateToProps(state) {
        return {
            pathname: state.router.location.pathname,
            search: state.router.location.search,
            hash: state.router.location.hash,
            githubOrgLoading: state.orgReducer.githubOrgLoading,
            githubOrgName: state.orgReducer.githubOrgName,
            githubOrgDetails: state.orgReducer.githubOrgDetails,
        };
    }
    function mapDispatchToProps(dispatch) {
        return {
            fetchGithubOrgStart: function () { return dispatch(fetchGithubOrgStart()); },
            fetchGithubOrgCancel: function () { return dispatch(fetchGithubOrgCancel()); },
            fetchGithubOrg: function (githubOrgName) { return dispatch(fetchGithubOrg(githubOrgName)); }
        };
    }
    var OrgDetailsContainer = reactRedux.connect(mapStateToProps, mapDispatchToProps)(OrgDetails);

    function orgReducer(state, action) {
        if (state === void 0) { state = { githubOrgName: "", githubOrgLoading: false, githubOrgDetails: {} }; }
        switch (action.type) {
            case FETCH_GITHUB_ORG_START:
                return __assign({}, state, { githubOrgLoading: true });
            case FETCH_GITHUB_ORG_DETAILS:
                return __assign({}, state, { githubOrgName: action.GithubOrgName, githubOrgLoading: false });
            case FETCH_GITHUB_ORG_DETAILS_FULFILLED:
                return __assign({}, state, { githubOrgDetails: action.GithubOrgDetails, githubOrgLoading: false });
            case FETCH_GITHUB_ORG_DETAILS_CANCEL:
                return __assign({}, state, { githubOrgLoading: false });
            case FETCH_GITHUB_ORG_DETAILS_FAILED:
                return __assign({}, state, { githubOrgLoading: false });
            default:
                return state;
        }
    }

    /* tslint:disable:no-string-literal */
    var getRequest = window['apiClient']['getRequest'];
    function apiLocation() {
        return 'https://api.github.com' ;
    }
    var fetchGithubOrgEpic = function (action$) {
        return action$.pipe(reduxObservable.ofType(FETCH_GITHUB_ORG_DETAILS), rxoperators.mergeMap(mergeResponse));
        function mergeResponse(action) {
            return getRequest({
                url: apiLocation() + "/orgs/" + action.GithubOrgName,
                withCredentials: false,
            }, fetchGithubOrgFulfilled, function (err) {
                console.log(err);
                return rxjs.concat([{ type: 'FETCH_GITHUB_ORG_DETAILS_FAILED' }]);
            }, action$, [FETCH_GITHUB_ORG_DETAILS_CANCEL]);
        }
    };

    // window['tempStore'] = window['store'].getState();
    window['store'].injectReducer('orgReducer', orgReducer);
    var addEpicFlag = true;
    for (var _i = 0, _a = window['epicRegistry']; _i < _a.length; _i++) {
        var value = _a[_i];
        if (value.name === fetchGithubOrgEpic.name) {
            addEpicFlag = false;
            break;
        }
    }
    if (addEpicFlag) {
        window['epic$'].next(fetchGithubOrgEpic);
        window['epicRegistry'].push(fetchGithubOrgEpic);
    }
    var Org = /** @class */ (function (_super) {
        __extends(Org, _super);
        function Org(props) {
            return _super.call(this, props) || this;
        }
        Org.prototype.render = function () {
            return (React.createElement("div", { className: "Org-cmp col-sm-9" },
                "Hello from Daynamic (runtime + lazy ) component, please enter github org name to get info.",
                React.createElement(OrgDetailsContainer, null)));
        };
        return Org;
    }(React.Component));
    // expose as many cmp as required
    window['tempLazyLoaded'] = {
        index: Org,
        wrapper: OrgDetailsContainer
    };

    exports.Org = Org;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=Org.module.js.map
var temp = ' .Org-cmp {  padding-top: 50px; }.OrgDetails-cmp .hide {  display: none; }.OrgDetails-cmp .show {  color: red; }'
appendStyle(temp)