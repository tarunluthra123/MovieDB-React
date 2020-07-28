import React from 'react';
import './App.css';
import NavBar from "./Components/NavBar";
import BrowsePage from "./Components/BrowsePage";
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import LoginPage from "./Components/LoginPage";
import MyMoviesPage from "./Components/MyMoviesPage";
import WatchlistPage from "./Components/WatchlistPage";
import MoviePage from "./Components/MoviePage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 'tarun',
            movieList: [],
            watchMovies: []
        }
        console.log('props = ', props)
    }

    componentDidMount() {
        // this.fetchData()
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

    updateLists = async (movieId, removeFromList, addToList) => {
        console.log('Move ' + movieId + ' from ' + removeFromList + ' addTo ' + addToList)
        if (removeFromList === 'mymovies') {
            let movieList = this.state.movieList
            const index = movieList.indexOf(movieId);
            console.log('index = ', index)
            if (index > -1) {
                movieList.splice(index, 1);
                this.setState({
                    movieList: movieList
                })
            }
        } else if (removeFromList === 'watchlist') {
            let watchlist = this.state.watchMovies
            const index = watchlist.indexOf(movieId)
            console.log('index = ', index)
            if (index > -1) {
                watchlist.splice(index, 1)
                this.setState({
                    watchMovies: watchlist
                })
            }
        }

        if (addToList === 'mymovies') {
            let movieList = this.state.movieList
            movieList.push(movieId)
            this.setState({
                movieList: movieList
            })
        } else if (addToList === 'watchlist') {
            let watchMovies = this.state.watchMovies
            watchMovies.push(movieId)
            this.setState({
                watchMovies: watchMovies
            })
        }

        const response = await fetch('/api/updateList', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.currentUser,
                removeFromList: removeFromList,
                addToList: addToList,
                movieId: movieId
            })
        })

        console.log(response)

        if (response.ok) {
            const data = await response.json()
            console.log(data)
        } else {
            console.log('could not update')
        }
    }

    render() {
        console.log(this.state)
        return (
            <Router>
                <div className="App">
                    <div className="row">
                        <div className="col-2 p-0">
                            <NavBar currentUser={this.state.currentUser}/>
                        </div>
                        <div className="col p-0" id="main">
                            <Route exact path='/' component={BrowsePage}>
                                <BrowsePage updateLists={this.updateLists} movieList={this.state.movieList}
                                            watchMovies={this.state.watchMovies}/>
                            </Route>
                            <Route exact path='/login' component={LoginPage}>
                                <LoginPage loginUserAPI={this.loginUserAPI}/>
                            </Route>
                            <Route exact path='/mymovies' component={MyMoviesPage}>
                                <MyMoviesPage movieList={this.state.movieList} updateLists={this.updateLists}/>
                            </Route>
                            <Route exact path='/watchlist' component={WatchlistPage}>
                                <WatchlistPage watchMovies={this.state.watchMovies} updateLists={this.updateLists}/>
                            </Route>
                            <Route exact path='/movie/:movieId' render={({match}) => (
                                <MoviePage movieList={this.state.movieList} watchMovies={this.state.watchMovies}
                                           updateLists={this.updateLists} match={match}/>)}>
                            </Route>
                        </div>
                    </div>

                </div>
            </Router>
        );
    }
}

export default withRouter(App);
