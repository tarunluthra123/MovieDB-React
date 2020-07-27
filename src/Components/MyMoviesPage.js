import React, {Component} from 'react';
import MovieCard from "./MovieCard";
import {withRouter} from 'react-router-dom';

class MyMoviesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            movieList: props.movieList,
            loading: false
        }
        console.log('my movies')
    }

    updateLists = (movieId, currentList, addToList) => {
        this.setState({
            loading: true
        }, async () => {
            await this.props.updateLists(movieId, currentList, addToList)
            const movieList = this.state.movieList
            let index = movieList.indexOf(movieId)
            if (index > -1) {
                movieList.splice(index, 1)
                this.setState({
                    watchMovies: movieList
                })
            }
            this.setState({
                loading: false
            })
        })
    }

    renderMyMovies = () => {
        const {loading, movieList} = this.state
        if (loading) {
            return (
                <p>Loading...</p>
            )
        }
        return (
            <React.Fragment>
                {movieList.map(imdbMovieId => {
                    return (<MovieCard movieId={imdbMovieId} currentList={'mymovies'} className="col"
                                       updateLists={this.updateLists}/>)
                })}
            </React.Fragment>
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
        const {movieList} = this.state
        return (
            <div className="p-2 m-2 row">
                {this.renderMyMovies()}
            </div>
        );
    }
}

export default withRouter(MyMoviesPage);