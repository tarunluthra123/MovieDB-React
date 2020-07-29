import React, {Component} from 'react';
import imdbLogo from '../assets/imdb_logo.png'
import {Button} from "react-bootstrap";

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: props.match.params.movieId,
            loading: true,
            movieList: props.movieList,
            watchMovies: props.watchMovies
        }
        console.log("props.match = ", props.match)
    }

    componentDidMount() {
        this.fetchData(this.state.movieId).then(() => console.log('MoviePage loaded'))
    }

    fetchData = async (movieId) => {
        this.setState({
            loading: true
        }, async () => {
            console.log("Movie page ", movieId)
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US`
            // const url = `https://api.themoviedb.org/3/find/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US&external_source=imdb_id`
            const res = await fetch(url)
            console.log("Movie Page - res = ", res)
            if (res.ok) {
                const movie = await res.json()
                console.log("Movie page=", movie)
                this.setState({
                    movie: movie,
                    error: null,
                    loading: false
                })
            } else {
                const error = (await res.json()).message
                console.log(error)
                this.setState({
                    error: error,
                    loading: false
                })
            }
        })
    }

    renderGenres = () => {
        const genres = this.state.movie.genres
        const badges = []
        for (const obj of genres) {
            const name = obj.name
            badges.push(<span className="badge badge-secondary btn-outline-dark m-2 p-2"><h4>{name}</h4></span>)
        }
        return badges
    }

    renderMoveListOptions = (movieId) => {
        const {movieList, watchMovies} = this.state
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
                            onClick={async () => await this.props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success" size="lg"
                            onClick={async () => await this.props.updateLists(movieId, currentList, 'watchlist')}
                            className="col p-2 m-2">Add to Watchlist</Button>
                </div>
            )
        } else if (currentList === 'mymovies') {
            return (
                <div className="row">
                    <Button variant="danger" size="lg"
                            onClick={() => this.props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from My Movies</Button>
                    <Button variant="success" size="lg"
                            onClick={() => this.props.updateLists(movieId, currentList, 'watchlist')}
                            className="col p-2 m-2">Move to Watchlist</Button>
                </div>
            )
        } else if (currentList === 'watchlist') {
            return (
                <div className="row">
                    <Button variant="info" size="lg"
                            onClick={async () => await this.props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success" size="lg"
                            onClick={async () => await this.props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from Watchlist</Button>
                </div>
            )
        }
    }


    render() {
        const {loading, movie, error} = this.state
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
                    <div className="row m-5">
                        <div className="col-8 p-2 m-2">
                            <h1 align="center" className="display-2 strokeme">
                                {movie && movie.original_title}
                            </h1>
                            <div className="row">
                                <div className="col">
                                    {movie && this.renderGenres()}
                                </div>
                                <div className="col-3 moviePageReleaseDate">
                                <span className="btn-lg btn btn-light btn-outline-dark m-2 p-2">
                                    <h2>{movie && movie.release_date}</h2>
                                </span>
                                </div>
                            </div>
                            <div className="row moviePageOverview m-2 p-2 card card-body">
                                {movie && movie.overview}
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <a href={`https:/imdb.com/title/${movie && movie.imdb_id}`} target={'_blank'}>
                                        <img src={imdbLogo} height={"100"} alt={"IMDB"}/>
                                    </a>
                                </div>
                                <div className="col">
                                    {movie && this.renderMoveListOptions(movie.id)}
                                </div>
                            </div>
                            <div className="row">
                                <div className={"card card-body"}>
                                    <h6><i>{movie && '"' + movie.tagline + '"'}</i></h6>
                                </div>
                            </div>
                        </div>
                        <div className="col p-2 m-2">
                            <img src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`}
                                 alt={`${movie && movie.original_title}`} height="500"/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default MoviePage;