import React, {useContext,useState} from 'react';
import MovieCard from "./MovieCard";
import {ListContext} from '../context/ListContext'

const WatchlistPage = (props) => {
    const [movieList, setMovieList, watchMovies, setWatchMovies] = useContext(ListContext)
    const [loading,setLoading] = useState(true)

    const updateLists = async (movieId, currentList, addToList) => {
        setLoading(true)
        await props.updateLists(movieId, currentList, addToList)
    }


    const renderWatchListMovies = () => {
        if (loading) {
            return (
                <p> Loading...</p>
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
        const cards = []
        for (const movieId of watchMovies) {
            cards.push(<MovieCard movieId={movieId} currentList={'watchlist'} className="col"
                                  updateLists={updateLists} />)
        }
        console.log(cards)
        return cards
    }

    return (
        <div className="p-2 m-2 row">
            {renderWatchListMovies()}
        </div>
    );
}

export default WatchlistPage;