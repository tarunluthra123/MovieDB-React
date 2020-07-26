import React, {Component} from 'react';
import MovieCard from "./MovieCard";

class BrowsePage extends Component {
    render() {
        return (
            <div className="row">
                <MovieCard movieId={'tt0848228'} className="col"/>
                <MovieCard movieId={'tt0468569'} className="col"/>
                <MovieCard movieId={'tt4154796'} className="col"/>
            </div>
        );
    }
}

export default BrowsePage;