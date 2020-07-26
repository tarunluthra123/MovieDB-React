import React, {Component} from 'react';
import MovieCard from "./MovieCard";
import {withRouter} from 'react-router-dom';

class MyMoviesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            movieList: [],
            loaded: false
        }
        console.log('my movies')
    }

    componentDidMount() {
        this.fetchUserMovies().then(() => {
            console.log('in then function after fetching my movies')
        })
    }

    fetchUserMovies = async () => {
        const response = await fetch('/api/mymovies', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.props.currentUser
            })
        })
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            const movieNames = data.data.movieNames
            console.log(movieNames)
            this.setState({
                movieList: movieNames,
                loaded: true
            })
        } else {
            console.log("Could not fetch user movies")
        }
    }

    renderMovies = () => {
        const movieList = this.state.movieList
        for (let i = 0; i < movieList.length; i++) {
            const movieId = movieList[i]
        }
    }

    renderMovieCard = (imdbMovieId) => {
        return (
            <MovieCard movieId={imdbMovieId} className="col"/>
        )
    }

    render() {
        if (this.props.currentUser === '') {
            return (
                <div className="p-2 m-2">
                    You must be logged in.
                </div>
            )
        }
        const {loaded, movieList} = this.state
        return (
            <div className="p-2 m-2 row">
                {loaded && (
                    <React.Fragment>
                        {movieList.map(imdbMovieId => {
                            return (<MovieCard movieId={imdbMovieId} className="col"/>)
                        })}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default withRouter(MyMoviesPage);