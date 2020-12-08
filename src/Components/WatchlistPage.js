import React, {useContext,useState,useEffect} from 'react';
import MovieCard from "./MovieCard";
import { ListContext } from '../context/ListContext'
import { UserContext } from '../context/UserContext'
import '../assets/css/watchlist.css'
import { Spinner } from 'react-bootstrap'

const WatchlistPage = (props) => {
    const [movieList, setMovieList, watchMovies, setWatchMovies] = useContext(ListContext)
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        props.fetchUserWatchList().then(()=>{setLoading(false)});    
    },[])

    const updateLists = async (movieId, currentList, addToList) => {
        setLoading(true)
        await props.updateLists(movieId, currentList, addToList)
    }

    if (loading) {
        return (
            <div className="loadingContainer">
                <span>
                    <Spinner animation="border" variant="primary" />  Fetching Data ... 
                </span>
            </div>
        )
    }
    if (currentUser === '') {
        return (
            <div className="p-2 m-2">
                You must be logged in.
            </div>
        )
    }
    if (watchMovies.length === 0) {
        return (
            <p><h4>
                This list includes the movies that you wish to watch later. You do not have any movies currently in
                this list.
                Go back to Browse menu to add some movies to this list.
            </h4></p>
        )
    }
    return (
        <div className="watchMoviesContainer">
            {watchMovies.map(movieId => <MovieCard movieId={movieId} currentList={'watchlist'} className="col"
                    updateLists={updateLists} />)}
        </div>
    )
}

export default WatchlistPage;