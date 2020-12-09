import React, {Component, useContext, useEffect, useState} from 'react';
import imdbLogo from '../assets/imdb_logo.png'
import { Button } from "react-bootstrap";
import { UserContext } from '../context/UserContext';
import { ListContext } from '../context/ListContext';
import '../assets/css/moviepage.css'

const MoviePage = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const movieId = props.match.params.movieId
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState()
    const [error, setError] = useState()
    const [movieList, setMovieList,watchMovies,setWatchMovies] = useContext(ListContext)

    useEffect(() => {
        fetchData(movieId).then(() => console.log('MoviePage loaded'))
    },[])

    const fetchData = async (movieId) => {
        setLoading(true)
        const API_KEY = process.env.REACT_APP_API_KEY
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        const res = await fetch(url)
        if (res.ok) {
            const movie = await res.json()
            setMovie(movie)
            setError(null)
            setLoading(false)
        } else {
            const error = (await res.json()).message
            console.log(error)
            setError(error)
            setLoading(false)
        }
    }

    const renderMoveListOptions = (movieId) => {
        let currentList = 'browse'
        if (movieList.includes(movieId)) {
            currentList = 'mymovies'
        } else if (watchMovies.includes(movieId)) {
            currentList = 'watchlist'
        }


        if (currentList === 'browse') {
            return (
                <div className="row">
                    <Button variant="info"
                            onClick={async () => await props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success"
                            onClick={async () => await props.updateLists(movieId, currentList, 'watchlist')}
                            className="col p-2 m-2">Add to Watchlist</Button>
                </div>
            )
        } else if (currentList === 'mymovies') {
            return (
                <div className="row">
                    <Button variant="danger"
                            onClick={() => props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from My Movies</Button>
                    <Button variant="success"
                            onClick={() => props.updateLists(movieId, currentList, 'watchlist')}
                            className="col p-2 m-2">Move to Watchlist</Button>
                </div>
            )
        } else if (currentList === 'watchlist') {
            return (
                <div className="row">
                    <Button variant="info"
                            onClick={async () => await props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success"
                            onClick={async () => await props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from Watchlist</Button>
                </div>
            )
        }
    }

    if (loading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
    if (error) {
        return (
            <div>
                <h3>Error fetching movie details</h3>
            </div>
        )
    }
    const sectionStyle = {
        width: "100%",
        height: "90vh",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    };
    console.log(movie)
    return (
        <div className="movie-page-container">
            <section style={sectionStyle} className="moviePageBackgroundImage">
                <div className="movie-page-title container">
                  <span> {movie && movie.original_title} </span>
                </div>
                <div className="row m-5 movie-page-info-container">
                    <div className="col-lg-8 p-2 m-2">
                        <div className="row">
                            <div className="col genre-badges-container">
                                {movie && movie.genres.map(genre => <span className="genreBadge">{genre.name}</span>)}
                            </div>
                            <div className="col-3">
                                <span className="btn-lg btn btn-light btn-outline-dark m-2 p-2">
                                    <span className="moviePageReleaseDate">{movie && movie.release_date}</span>
                                </span>
                            </div>
                        </div>
                        <div className="row moviePageOverview m-2 p-2 card card-body">
                            {movie && movie.overview}
                        </div>
                        <div className="row">
                            <div className="col-3 abc">
                                <a href={`https://www.imdb.com/title/${movie && movie.imdb_id}`} target={'_blank'}>
                                    <img src={imdbLogo} className="moviePageImdbLogo" alt={"IMDB"}/>
                                </a>
                            </div>
                            <div className="col move-lists-buttons">
                                {movie && currentUser && renderMoveListOptions(movie.id)}
                            </div>
                        </div>
                        <div className="movie-tagline-container">
                            {movie && movie.tagline && (
                                <div className={"card card-body"}>
                                    <span className="movie-tagline">{'"' + movie.tagline + '"'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-lg p-2 m-2">
                        <img src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`}
                                alt={`${movie && movie.original_title}`} className="moviePagePoster"/>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MoviePage;