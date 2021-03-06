import React, {useContext,useState,useEffect} from 'react';
import MovieCard from "./MovieCard";
import {withRouter} from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ListContext } from '../context/ListContext'
import '../assets/css/mymoviespage.css'
import { Spinner } from 'react-bootstrap'

const MyMoviesPage = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [movieList, setMovieList,watchMovies,setWatchMovies] = useContext(ListContext)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        props.fetchUserMovies().then(()=>{setLoading(false)});    
    },[])

    const updateLists = async (movieId, currentList, addToList) => {
        setLoading(true);
        await props.updateLists(movieId, currentList, addToList)
        setLoading(false)
    }


    if (currentUser === '') {
        return (
            <div className="p-2 m-2">
                You must be logged in.
            </div>
        )
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
    return (
        <div className="myMoviesCardsContainer">
            {movieList && movieList.length > 0 && movieList.map(movieId => {
                return (<MovieCard movieId={movieId} currentList={'mymovies'} className="col"
                                updateLists={updateLists} />)
            })}
            {movieList && movieList.length === 0 && (
                <p><h4>
                    This list includes the movies that you have watched. You do not have any movies in this list
                    currently.
                    Go back to Browse Menu to add some movies here.
                </h4></p>
            )}
        </div>
    )
}

export default withRouter(MyMoviesPage);