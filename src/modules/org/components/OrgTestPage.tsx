import * as React from 'react';


/* tslint:disable:no-string-literal */






export default class OrgTestPage extends React.Component<any, any> {

    

    constructor(props: any) {
        super(props);
       
    }


    public render() {
        return (   
        <div className="OrgTestPage-cmp">
                
                Hello from Dynamic (runtime + lazy ) component, this is <b>not</b> CookieSecure page.

        </div>
        )
    }
}
