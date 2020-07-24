import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";

class MovieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.movieId,
            loading: false
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
            const url = `https://api.themoviedb.org/3/find/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US&external_source=imdb_id`
            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()
                const movie = data.movie_results[0]
                return this.setState({
                    movie: movie,
                    error: null,
                    loading: false
                })
            }

            const error = (await res.json()).message
            this.setState({
                error: error,
                loading: false
            })
        })

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
                    <div>
                        Loading...
                    </div>
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
                        <Button variant="success">Add to Watchlist</Button>
                    </Card.Body>
                </Card>
            );
        }
    }
}

export default MovieCard;