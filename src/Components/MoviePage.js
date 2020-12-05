import React, {Component, useContext, useEffect, useState} from 'react';
import imdbLogo from '../assets/imdb_logo.png'
import {Button} from "react-bootstrap";
import { UserContext } from '../context/UserContext';
import { ListContext } from '../context/ListContext';

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
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US`
        // const url = `https://api.themoviedb.org/3/find/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US&external_source=imdb_id`
        const res = await fetch(url)
        console.log("Movie Page - res = ", res)
        if (res.ok) {
            const movie = await res.json()
            console.log("Movie page=", movie)
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

    const renderGenres = () => {
        const genres = movie.genres
        const badges = []
        for (const obj of genres) {
            const name = obj.name
            badges.push(<span className="badge badge-secondary btn-outline-dark m-2 p-2"><h4
                className="genreBadge">{name}</h4></span>)
        }
        return badges
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
                    <Button variant="info" size="lg"
                            onClick={async () => await props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success" size="lg"
                            onClick={async () => await props.updateLists(movieId, currentList, 'watchlist')}
                            className="col p-2 m-2">Add to Watchlist</Button>
                </div>
            )
        } else if (currentList === 'mymovies') {
            return (
                <div className="row">
                    <Button variant="danger" size="lg"
                            onClick={() => props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from My Movies</Button>
                    <Button variant="success" size="lg"
                            onClick={() => props.updateLists(movieId, currentList, 'watchlist')}
                            className="col p-2 m-2">Move to Watchlist</Button>
                </div>
            )
        } else if (currentList === 'watchlist') {
            return (
                <div className="row">
                    <Button variant="info" size="lg"
                            onClick={async () => await props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success" size="lg"
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
        height: "900px",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    };
    return (
        <div className="row">
            <section style={sectionStyle} className="moviePageBackgroundImage">

                <h1 align="center" className="strokeme">
                    {movie && movie.original_title}
                </h1>
                <div className="row m-5">
                    <div className="col-lg-8 p-2 m-2">
                        <div className="row">
                            <div className="col">
                                {movie && renderGenres()}
                            </div>
                            <div className="col-3">
                            <span className="btn-lg btn btn-light btn-outline-dark m-2 p-2">
                                <h3 className="moviePageReleaseDate">{movie && movie.release_date}</h3>
                            </span>
                            </div>
                        </div>
                        <div className="row moviePageOverview m-2 p-2 card card-body">
                            {movie && movie.overview}
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <a href={`https://www.imdb.com/title/${movie && movie.imdb_id}`} target={'_blank'}>
                                    <img src={imdbLogo} className="moviePageImdbLogo" alt={"IMDB"}/>
                                </a>
                            </div>
                            <div className="col">
                                {movie && currentUser && renderMoveListOptions(movie.id)}
                            </div>
                        </div>
                        <div className="row">
                            {movie && movie.tagline && (
                                <div className={"card card-body"}>
                                    <h6><i>{'"' + movie.tagline + '"'}</i></h6>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-lg p-2 m-2">
                        <img src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`}
                                alt={`${movie && movie.original_title}`} className="moviePagePoster" height="500"/>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MoviePage;