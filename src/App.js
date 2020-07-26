import React from 'react';
import './App.css';
import NavBar from "./Components/NavBar";
import BrowsePage from "./Components/BrowsePage";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from "./Components/LoginPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ''
        }
    }

    componentDidMount() {
        this.fetchData().then(console.log)
    }

    fetchData = async () => {
        const res = await fetch('/ping')
        if (res.ok) {
            console.log(res)
            const data = await res.json()
            console.log("data = ", data)
        }
    }

    loginUserAPI = (username, password) => {
        fetch('/api/login', {
            name: username,
            password: password
        }).then((res) => {
            if (res === 'incorrect') {
                this.setState({
                    invalidLoginModal: true
                })
            } else {
                this.setState({
                    currentUser: username
                })
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <Router>
                <div className="App">
                    <div className="row">
                        <div className="col-2">
                            <NavBar currentUser={this.state.currentUser}/>
                        </div>
                        <div className="col" id="main">
                            <Route exact path='/' component={BrowsePage}/>
                            <Route exact path='/login' component={LoginPage}/>
                        </div>
                    </div>

                </div>
            </Router>
        );
    }
}

export default App;
