import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../assets/css/login.css'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.usernameInput = React.createRef()
        this.passwordInput = React.createRef()
    }

    callbackFunctionForLogin = () => {
        this.props.history.push('/')
    }

    loginUser = () => {
        console.log(this.usernameInput.current.value, this.passwordInput.current.value)
        this.props.loginUserAPI(this.usernameInput.current.value, this.passwordInput.current.value, this.callbackFunctionForLogin)
    }


    render() {
        return (
            <div className="login-page-container">
                <h1 align={"center"}>Login</h1>
                <div className={"container card card-body"}>
                    Username : <input type="text" name="username" ref={this.usernameInput} placeholder={'Username'}/>
                    <br/>
                    Password : <input type="password" name="pass" ref={this.passwordInput} placeholder={'Password'}/>
                    <br/>
                    <button type="submit" className="btn btn-success btn-lg" onClick={this.loginUser}>Login</button>
                </div>
                <div className="container card card-body">
                    <h4>
                        Don't have an account ? <br/>
                        Don't worry. <br /> 
                    </h4>
                    <button type="submit" className="btn btn-outline-info btn-lg"
                            onClick={() => this.props.history.push('/signup')}>
                        Sign Up Here
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);