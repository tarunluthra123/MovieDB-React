import React, {useContext,useState} from 'react';
import MovieCard from "./MovieCard";
import {withRouter} from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ListContext } from '../context/ListContext'

const MyMoviesPage = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [movieList, setMovieList,watchMovies,setWatchMovies] = useContext(ListContext)
    const [loading, setLoading] = useState(false);

    const updateLists = async (movieId, currentList, addToList) => {
        setLoading(true);
        await props.updateLists(movieId, currentList, addToList)
        setLoading(false)
    }

    const renderMyMovies = () => {
        if (loading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }


    if (currentUser === '') {
        return (
            <div className="p-2 m-2">
                You must be logged in.
            </div>
        )
    }
    return (
        <div className="p-2 m-2 row">
            {renderMyMovies()}
        </div>
    );
}

export default withRouter(MyMoviesPage);