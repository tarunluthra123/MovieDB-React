import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";

class MovieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.movieId,
            loading: false,
            currentList: props.currentList
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
                    <Button variant="info" onClick={() => this.props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success" onClick={() => this.props.updateLists(movieId, currentList, 'watchlist')}
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
                    <Button variant="info" onClick={() => this.props.updateLists(movieId, currentList, 'mymovies')}
                            className="col p-2 m-2">Add to My Movies</Button>
                    <Button variant="success" onClick={() => this.props.updateLists(movieId, currentList, 'browse')}
                            className="col p-2 m-2">Remove from Watchlist</Button>
                </div>
            )
        }
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
                        Loading...
                    </Card>
                )
            }
            return (
                <Card style={{width: '18rem'}} className="border-dark p-2 m-3">
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`}
                              height="400"/>
                    <Card.Body>
                        <Card.Title className="h1">{movie && movie.title}</Card.Title>
                        <Card.Text>
                            {movie && movie.overview}
                        </Card.Text>
                        {this.renderButtonBox()}
                    </Card.Body>
                </Card>
            );
        }
    }
}

export default MovieCard;