import * as React from 'react';
import "./Org.module.scss";

import OrgDetailsContainer from './containers/Org';
import OrgTestPage from './components/OrgTestPage';


/* tslint:disable:no-string-literal */
// add all reducer to root reducer
import  { orgReducer }  from './reducers/Org';
// window['tempStore'] = window['store'].getState();
window['store'].injectReducer('orgReducer' , orgReducer);


// add epic of module
import { fetchGithubOrgEpic } from './epic/org';
let addEpicFlag = true;
for (const value of window['epicRegistry']) {

    if(value.name === fetchGithubOrgEpic.name){
        addEpicFlag = false;
        break;
    }
}
if(addEpicFlag){
    window['epic$'].next(fetchGithubOrgEpic);
    window['epicRegistry'].push(fetchGithubOrgEpic);
}




export class Org extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

    }

    public render() {
        return (
            <div className="Org-cmp col-sm-9">

                  Hello from Dynamic (runtime + lazy ) component, this is CookieSecure page. please enter github org name to get info.
                <OrgDetailsContainer />

            </div>
        )
    }
}
// expose as many cmp as required
window['tempLazyLoaded'] =  {
    index : Org,
    wrapper : OrgDetailsContainer,
    testpage : OrgTestPage
};
