import React, {useEffect ,useContext, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import {UserContext} from '../context/UserContext'

const MovieCard = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const id = props.movieId;
    const [loading, setLoading] = useState(false);
    const currentList = props.currentList;
    const [flag, setFlag] = useState(true);
    const [movie, setMovie] = useState()

    useEffect(() => {
        fetchData(id)
    }, [])

    const fetchData = async (movieId) => {
        setLoading(true);
        const API_KEY = process.env.REACT_APP_API_KEY
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        const res = await fetch(url)
        if (res.ok) {
            const movie = await res.json()
            setMovie(movie)
            setLoading(false)
            // console.log('movie overview =', movie.overview.length)
            if (movie.overview.length >= 150) {
                setFlag(false)
            }
        } else {
            const error = (await res.json()).message
            alert(error)
            setLoading(false)
        }
    }

    const renderButtonBox = () => {
        const movieId = id
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
                    <Button variant="danger" onClick={() => props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from My Movies</Button>
                    <Button variant="success" onClick={() => props.updateLists(movieId, currentList, 'watchlist')}
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
                            className="colp-2 m-2">Remove from Watchlist</Button>
                </div>
            )
        }
    }

    const renderMovieDescription = () => {
        if (loading)
            return <p>Loading..</p>
        let text = movie.overview
        if (flag) {
            //Read more not required
            return (
                <p>
                    {text}
                </p>
            )
        } else {
            let shorterText = text.substr(0, 145)
            return (
                <div>
                    {shorterText}...
                    <br/>
                    <button type="button" className="btn btn-link" onClick={() => {
                        setFlag(true)
                    }}>
                        Read More
                    </button>
                </div>
            )
        }

    }

    const redirectToMoviePage = () => {
        props.history.push('/movie/' + movie.id)
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        // console.log("Movie = ", movie)
        if (loading) {
            return (
                <Card>
                    <Card.Body>
                        Loading...
                    </Card.Body>
                </Card>
            )
        }
        return (
            <Card className="border-dark p-2 m-3 movieCardBody">
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`}
                            height="400" onClick={redirectToMoviePage} className={"btn"}/>
                <Card.Body>
                    <Card.Title className="h1 btn"
                                onClick={redirectToMoviePage}>{movie && movie.title + ' (' + movie.release_date.substr(0, 4) + ')'}</Card.Title>
                    <Card.Text>
                        {!loading && movie && renderMovieDescription()}
                    </Card.Text>
                    {currentUser && renderButtonBox()}
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(MovieCard);