import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'tarun',
            password: 'abc'
        }

        this.usernameInput = React.createRef()
        this.passwordInput = React.createRef()
    }

    callbackFunctionForLogin = () => {
        this.props.history.push('/')
    }

    loginUser = (e) => {
        const target = e.target
        console.log("e = ", e)
        console.log(this.usernameInput.current.value, this.passwordInput.current.value)
        this.props.loginUserAPI(this.usernameInput.current.value, this.passwordInput.current.value, this.callbackFunctionForLogin)
    }


    render() {
        return (
            <div className="p-2 m-2">
                <input type="text" name="username" ref={this.usernameInput} placeholder={'Username'}/>
                <br/>
                <input type="password" name="pass" ref={this.passwordInput} placeholder={'Password'}/>
                <br/>
                <button type="submit" onClick={this.loginUser}>Login</button>
            </div>
        );
    }
}

export default withRouter(LoginPage);