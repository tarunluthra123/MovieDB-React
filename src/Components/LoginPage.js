import React, {Component} from 'react';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'tarun',
            password: ''
        }
    }

    loginUser = (e) => {
        const target = e.target

    }

    handleChange = (e) => {
        console.log(e)
    }

    render() {
        return (
            <div className="p-2 m-2">
                <form action="">
                    <input type="text" name="username" onChange={this.handleChange} placeholder={this.state.username}/>
                    <br/>
                    <input type="password" name="pass" onChange={this.handleChange} value={this.state.password}/>
                    <br/>
                    <button type="submit" onClick={this.loginUser}>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;