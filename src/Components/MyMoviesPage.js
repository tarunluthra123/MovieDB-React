import React, {Component} from 'react';
import MovieCard from "./MovieCard";
import {withRouter} from 'react-router-dom';

class MyMoviesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.currentUser,
            movieList: props.movieList,
            loaded: false
        }
        console.log('my movies')
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
                {movieList && (
                    <React.Fragment>
                        {movieList.map(imdbMovieId => {
                            return (<MovieCard movieId={imdbMovieId} currentList={'mymovies'} className="col" updateLists={this.props.updateLists}/>)
                        })}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default withRouter(MyMoviesPage);