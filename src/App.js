import React from 'react';
import './App.css';
import NavBar from "./Components/NavBar";
import BrowsePage from "./Components/BrowsePage";
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import LoginPage from "./Components/LoginPage";
import MyMoviesPage from "./Components/MyMoviesPage";
import WatchlistPage from "./Components/WatchlistPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 'tarun'
        }
        console.log('props = ', props)
    }

    componentDidMount() {
        this.fetchData().then(this.fetchUserMovies).then(this.fetchUserWatchList)
    }

    fetchData = async () => {
        const res = await fetch('/ping')
        if (res.ok) {
            console.log(res)
            const data = await res.json()
            console.log("data = ", data)
        }
    }

    loginUserAPI = async (username, password) => {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: username,
                password: password
            })
        }
        const response = await fetch('/api/login', request)
        console.log("response = ", response)
        if (response.ok) {
            const data = await response.json()
            // console.log("data = ", data)
            const msg = data.msg
            if (msg === 'incorrect') {
                this.setState({
                    invalidLoginModal: true
                })
                alert("Incorrect username or password")
            } else {
                this.setState({
                    currentUser: username
                })
                this.props.history.push('/')
            }
        }
    }

    fetchUserMovies = async () => {
        const response = await fetch('/api/mymovies', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.currentUser
            })
        })
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            const movieNames = data.data.movieNames
            console.log(movieNames)
            this.setState({
                movieList: movieNames,
            })
        } else {
            console.log("Could not fetch user movies")
        }
    }


    fetchUserWatchList = async () => {
        const response = await fetch('/api/watchlist', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.currentUser
            })
        })
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            const watch = data.data.watch
            console.log(watch)
            this.setState({
                watchMovies: watch,
            })
            console.log('Fetched watchlist', watch)
        } else {
            console.log("Could not fetch watchlist")
        }
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
                            <Route exact path='/' component={BrowsePage}>
                                <BrowsePage/>
                            </Route>
                            <Route exact path='/login' component={LoginPage}>
                                <LoginPage loginUserAPI={this.loginUserAPI}/>
                            </Route>
                            <Route exact path='/mymovies' component={MyMoviesPage}>
                                <MyMoviesPage movieList={this.state.movieList}/>
                            </Route>
                            <Route exact path='/watchlist' component={WatchlistPage}>
                                <WatchlistPage watchMovies={this.state.watchMovies}/>
                            </Route>
                        </div>
                    </div>

                </div>
            </Router>
        );
    }
}

export default withRouter(App);
