import React, {Component} from 'react';
import MovieCard from "./MovieCard";

class WatchlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchMovies: props.watchMovies
        }
    }

    render() {
        const watchMovies = this.state.watchMovies
        console.log('in watchlist', watchMovies)
        return (
            <div className="p-2 m-2 row">
                {watchMovies && (
                    <React.Fragment>
                        {watchMovies.map(imdbMovieId => {
                            return (<MovieCard movieId={imdbMovieId} currentList={'watchlist'} className="col" updateLists={this.props.updateLists}/>)
                        })}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default WatchlistPage;