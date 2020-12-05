import React, { useContext, useEffect ,useState}from 'react';
import './App.css';
import NavBar from "./Components/NavBar";
import BrowsePage from "./Components/BrowsePage";
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import LoginPage from "./Components/LoginPage";
import MyMoviesPage from "./Components/MyMoviesPage";
import WatchlistPage from "./Components/WatchlistPage";
import MoviePage from "./Components/MoviePage";
import AboutPage from "./Components/AboutPage";
import SignUpPage from "./Components/SignUpPage";
import { UserContext } from './context/UserContext'
import { ListContext } from './context/ListContext' 

const App = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [movieList, setMovieList, watchMovies, setWatchMovies] = useContext(ListContext)
    const [userLoggingIn,setUserLoggingIn] = useState(false)

    useEffect(() => {
        if (currentUser !== '')
            fetchData().then(fetchUserMovies).then(fetchUserWatchList)
    }, [])
    
    useEffect(() => {
        if (userLoggingIn) {
            if (currentUser != '') {
                setUserLoggingIn(false)
                fetchData().then(fetchUserMovies).then(fetchUserWatchList)
            }
        }
    })

    const fetchData = async () => {
        const res = await fetch('/ping')
        if (res.ok) {
            console.log(res)
            const data = await res.json()
            console.log("data = ", data)
        }
    }

    const loginUserAPI = async (username, password, callbackFromLoginPage) => {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
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
                alert("Incorrect username or password")
            } else {
                console.log("abracadbra")
                setUserLoggingIn(true)
                setCurrentUser(username)
                callbackFromLoginPage()
            }
        }
    }

    const fetchUserMovies = async () => {
        const response = await fetch('/api/mymovies', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: currentUser
            })
        })
        if (response.ok) {
            const data = await response.json()
            const movieNames = data.data.movieNames || []
            setMovieList(movieNames)
        } else {
            console.log("Could not fetch user movies")
        }
    }


    const fetchUserWatchList = async () => {
        const response = await fetch('/api/watchlist', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: currentUser
            })
        })
        if (response.ok) {
            const data = await response.json()
            const newWatchList = data.data.watch || []
            setWatchMovies(newWatchList)
        } else {
            console.log("Could not fetch watchlist")
        }
    }

    const updateLists = async (movieId, removeFromList, addToList) => {
        console.log('Move ' + movieId + ' from ' + removeFromList + ' addTo ' + addToList)
        if (removeFromList === 'mymovies') {
            const index = movieList.indexOf(movieId);
            console.log('index = ', index)
            if (index > -1) {
                movieList.splice(index, 1);
                setMovieList(movieList)
            }
        } else if (removeFromList === 'watchlist') {
            let watchlist = watchMovies
            const index = watchlist.indexOf(movieId)
            console.log('index = ', index)
            if (index > -1) {
                watchlist.splice(index, 1)
                setWatchMovies(watchlist)
            }
        }

        if (addToList === 'mymovies') {
            setMovieList([...movieList,movieId])
        } else if (addToList === 'watchlist') {
            setWatchMovies([...watchMovies,movieId])
        }

        const response = await fetch('/api/updateList', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: currentUser,
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

    const logoutUser = () => {
        setMovieList([])
        setWatchMovies([])
        setCurrentUser('')
    }

    return (
        <Router>
            <div className="App">
                <div className="row">
                    <div className="row col-lg-2 col-md-2 col-sm-3 col-3 p-2 m-1">
                        <NavBar logoutUser={logoutUser}/>
                    </div>
                    {/*<div className="col-lg-1 col-md-1 col-sm-1 col-1"/>*/}
                    <div className="col-lg col-md col-sm col p-2 m-1" id="main">
                        <Route exact path='/' component={BrowsePage}>
                            <BrowsePage updateLists={updateLists} />
                        </Route>
                        <Route exact path='/login' component={LoginPage}>
                            <LoginPage loginUserAPI={loginUserAPI}/>
                        </Route>
                        <Route exact path='/mymovies' component={MyMoviesPage}>
                            <MyMoviesPage updateLists={updateLists}
                                            />
                        </Route>
                        <Route exact path='/watchlist' component={WatchlistPage}>
                            <WatchlistPage updateLists={updateLists}
                                            />
                        </Route>
                        <Route exact path='/movie/:movieId' render={({match}) => (
                            <MoviePage updateLists={updateLists} match={match} />)}>
                        </Route>
                        <Route exact path='/about' component={AboutPage}/>
                        <Route exact path='/signup' component={SignUpPage}>
                            <SignUpPage loginUserAPI={loginUserAPI}/>
                        </Route>
                    </div>
                </div>

                </div>
        </Router>
    );
}

export default withRouter(App);
