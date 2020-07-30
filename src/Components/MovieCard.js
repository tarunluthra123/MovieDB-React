import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";
import {withRouter} from 'react-router-dom';

class MovieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.movieId,
            loading: false,
            currentList: props.currentList,
            flag: true
        }
    }

    componentDidMount() {
        this.fetchData(this.state.id).then(r => {
            console.log('in then');
            this.render()
        })
    }

    fetchData = async (movieId) => {
        this.setState({
            loading: true
        }, async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US`
            // const url = `https://api.themoviedb.org/3/find/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US&external_source=imdb_id`
            const res = await fetch(url)
            if (res.ok) {
                const movie = await res.json()
                this.setState({
                    movie: movie,
                    error: null,
                    loading: false
                })
                console.log('movie overview =', movie.overview.length)
                if (movie.overview.length >= 150) {
                    this.setState({
                        flag: false
                    })
                }
            } else {
                const error = (await res.json()).message
                this.setState({
                    error: error,
                    loading: false
                })
            }

        })

    }

    renderButtonBox = () => {
        const currentList = this.state.currentList
        const movieId = this.state.id
        if (currentList === 'browse') {
            return (
                <div className="row">
                    <Button variant="info"
                            onClick={async () => await this.props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success"
                            onClick={async () => await this.props.updateLists(movieId, currentList, 'watchlist')}
                            className="col p-2 m-2">Add to Watchlist</Button>
                </div>
            )
        } else if (currentList === 'mymovies') {
            return (
                <div className="row">
                    <Button variant="danger" onClick={() => this.props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from My Movies</Button>
                    <Button variant="success" onClick={() => this.props.updateLists(movieId, currentList, 'watchlist')}
                            className="col p-2 m-2">Move to Watchlist</Button>
                </div>
            )
        } else if (currentList === 'watchlist') {
            return (
                <div className="row">
                    <Button variant="info"
                            onClick={async () => await this.props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success"
                            onClick={async () => await this.props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from Watchlist</Button>
                </div>
            )
        }
    }

    renderMovieDescription = () => {
        const {loading, flag, movie} = this.state
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
                        this.setState({
                            flag: true
                        })
                    }}>Read More
                    </button>
                </div>
            )
        }

    }

    redirectToMoviePage = () => {
        this.props.history.push('/movie/' + this.state.movie.id)
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            const movie = this.state.movie
            console.log("Movie = ", movie)
            if (this.state.loading) {
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
                              height="400" onClick={this.redirectToMoviePage} className={"btn"}/>
                    <Card.Body>
                        <Card.Title className="h1 btn"
                                    onClick={this.redirectToMoviePage}>{movie && movie.title + ' (' + movie.release_date.substr(0, 4) + ')'}</Card.Title>
                        <Card.Text>
                            {!this.state.loading && movie && this.renderMovieDescription()}
                        </Card.Text>
                        {this.props.currentUser && this.renderButtonBox()}
                    </Card.Body>
                </Card>
            );
        }
    }
}

export default withRouter(MovieCard);