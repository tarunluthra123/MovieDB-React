import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';


class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.usernameInput = React.createRef()
        this.passwordInput = React.createRef()
    }

    signUpUser = async()=>{
        const username = this.usernameInput.current.value
        const password = this.passwordInput.current.value

        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        const response = await fetch('/api/signup',request)
        if(response.ok){
            const data = await response.json()
            const msg = data.msg
            if(msg==='Success'){
                this.props.loginUserAPI(username,password,()=>this.props.history.push('/'))
            } else {
                alert("Username already taken up ... try again")
            }
        }
    }



    render() {
        return (
            <div className="p-2 m-2">
                <h1 align="center">Sign Up</h1>
                <div className={"container card card-body"}>
                    Username : <input type="text" name="username" ref={this.usernameInput} placeholder={'Username'}/>
                    <br/>
                    Password : <input type="password" name="pass" ref={this.passwordInput} placeholder={'Password'}/>
                    <br/>
                    <button type="submit" className="btn btn-primary btn-lg" onClick={this.signUpUser}>Login</button>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUpPage);