import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../assets/css/signup.css'


class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.usernameInput = React.createRef()
        this.passwordInput = React.createRef()
    }

    signUpUser = async () => {
        const username = this.usernameInput.current.value
        const password = this.passwordInput.current.value

        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                password
            })
        }
        const response = await fetch('/api/signup', request)
        if (response.ok) {
            const data = await response.json()
            const msg = data.msg
            if (msg === 'Success') {
                this.props.loginUserAPI(username, password, () => this.props.history.push('/'))
            } else {
                alert("Username already taken up ... try again")
            }
        }
    }


    render() {
        return (
            <div className="sign-up-container">
                <h1 align="center">Sign Up</h1>
                <div className={"container card card-body"}>
                    Username : <input type="text" name="username" ref={this.usernameInput} placeholder={'Username'}/>
                    <br/>
                    Password : <input type="password" name="pass" ref={this.passwordInput} placeholder={'Password'}/>
                    <br/>
                    <button type="submit" className="btn btn-info btn-lg" onClick={this.signUpUser}>Sign Up</button>
                </div>
                <div className="container card card-body">
                    <h4>
                        Already have an account ? <br />
                        That's awesome !! <br/>
                    </h4>
                    <button type="submit" className="btn btn-outline-success btn-lg"
                            onClick={() => this.props.history.push('/login')}>
                        Login Here
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUpPage);