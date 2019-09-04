import * as React from 'react';
import './OrgDetails.scss';

/* tslint:disable:no-string-literal */
const qs = window['qs'];
/* tslint:disable:no-string-literal */
// import * as qs from 'query-string';


/*
interface IProps {
    githubOrgName: string,
    githubOrgLoading: boolean,
    githubOrgDetails: {
        data: object
    },
    fetchGithubOrgStart: () => void,
    fetchGithubOrg: (githubOrgName: string) => void,
    fetchGithubOrgCancel: () => void,
    search: object,
    history: {
        push: (path: string) => void
    }

}
*/

interface IState {
    githubOrgName: string;
    hideShow: string;
}

export default class OrgDetails extends React.Component<any, IState> {

    public state: IState = {
        githubOrgName: "",
        hideShow: "hide",
    };

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public handleCancel(){
        this.props.fetchGithubOrgCancel();
    }

    public handleChange(event) {
        if (event.target.value) {
            this.setState({hideShow: "hide", githubOrgName: event.target.value});
        } else {
            this.setState({hideShow: "show", githubOrgName: ""});
        }
    }

    public handleSubmit(event) {
        event.preventDefault();
        if (!this.state.githubOrgName) {
            this.setState({hideShow: "show"});
        } else {
            // both below line of code are required to trigger api call from componentWillReceiveProps
            // this.props.fetchGithubOrgStart();
            console.log(this.props);
            window['reacthistory'].push('/org?githubOrgName=' + this.state.githubOrgName);

        }
    }
    
    
    public componentWillReceiveProps( nextProps) {
        console.log(this.props  ,nextProps);
        // nextProps.githubOrgLoading flag is used when handleChange is called and will update state but we don't want to call api
        // when handleSubmit is called will update  nextProps.githubOrgLoading via action and then updating url that will trigger same cmp
        // and will go to  componentWillReceiveProps section
        if (nextProps.githubOrgLoading) {
            this.props.fetchGithubOrg(qs.parse(nextProps.search, {ignoreQueryPrefix: true}).githubOrgName);
        }

        if(qs.parse(this.props.search).githubOrgName !== qs.parse(nextProps.search).githubOrgName && !nextProps.githubOrgLoading){
            this.props.fetchGithubOrgStart();
        }
    }
    

    public componentDidMount() {
        const githubOrgName =  qs.parse(this.props.search, {ignoreQueryPrefix: true}).githubOrgName;
        if (githubOrgName) {
            this.setState({githubOrgName});
            this.props.fetchGithubOrgStart();
            // console.log(qs);
            // this.props.fetchGithubOrg(qs.parse(this.props.search, {ignoreQueryPrefix: true}).githubOrgName);
            console.log(this.props,this.state)
;        }
    }

    public render() {
        return (   <div className="OrgDetails-cmp">
                <div className="search-css">
                    <h3><span className="badge badge-secondary"> Dashboard</span></h3>
                    <br/><br/>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="input-group">
                            <input disabled = {this.props.githubOrgLoading} type="text" value={this.state.githubOrgName} onChange={this.handleChange}
                                   className="form-control" placeholder="github orgname"
                                   data-toggle="tooltip" data-placement="bottom" title="Enter github orgname"/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit">Search</button>
                                <button onClick={this.handleCancel} className="btn btn-outline-secondary" type="button">cancel</button>
                            </div>
                        </div>
                        <div className={`alert alert-danger ${this.state.hideShow} `} role="alert">
                            Please enter github orgname.
                        </div>
                    </form>
                </div>

                <pre>{JSON.stringify(this.props.githubOrgDetails, null, 2) }</pre>


            </div>
        )
    }
}
