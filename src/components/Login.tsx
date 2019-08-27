import * as React from 'react';
import './Login.scss'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface IProps {
    loggedIn:boolean,
    from : any,
    login:(username:string,password:string) => void,
    history: {
        push: (path: string) => void
    },
    location:{
        state:{
            from:any
        }
    }
}

export default class Login extends React.Component<IProps,any> {
    public state: any = {
        username:"",
        password:""
    };

   constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event) {

        if(event.target.value) {
            this.setState({[event.target.id]:event.target.value})
        }
    }

    public handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.username,this.state.password);
        return ('<')
    }

    public componentWillMount(){
        if(cookies.get('isLoggedin') === "true"){
            this.props.history.push('/search')
        }
    }

    public componentWillReceiveProps(nextProps:IProps){
        if(nextProps.loggedIn){
            if(nextProps.from && nextProps.from !== '/login'){
                this.props.history.push(nextProps.from);
            }else if(this.props.location.state && this.props.location.state.from) {
                const {pathname, search} = this.props.location.state.from;
                if (pathname && pathname !== '/login') {
                    this.props.history.push(pathname + search)
                }
            }else{
                this.props.history.push('/search');
            }

        } else {
            alert("not Login in ");
        }
    }

    public render() {
        return (
            <div className="Login-cmp col-sm-12" id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" onSubmit={(e) => this.handleSubmit(e)}>
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label className="text-info">Username:</label>
                                        <br />
                                        <input onChange={(e) => this.handleChange(e)} required type="text" name="username" id="username" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">Password:</label><br />
                                        <input onChange={(e) => this.handleChange(e)} required type="password" name="password" id="password" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input  type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
};