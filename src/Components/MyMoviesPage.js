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
                {movieList && movieList.length > 0 && movieList.map(movieId => {
                    return (<MovieCard movieId={movieId} currentList={'mymovies'} className="col"
                                       updateLists={this.updateLists} currentUser={this.props.currentUser}/>)
                })}
                {movieList && movieList.length === 0 && (
                    <p><h4>
                        This list includes the movies that you have watched. You do not have any movies in this list
                        currently.
                        Go back to Browse Menu to add some movies here.
                    </h4></p>
                )}
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
        return (
            <div className="p-2 m-2 row">
                {this.renderMyMovies()}
            </div>
        );
    }
}

export default withRouter(MyMoviesPage);