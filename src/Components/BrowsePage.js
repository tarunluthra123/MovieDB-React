import React, {Component} from 'react';
import MovieCard from "./MovieCard";

class BrowsePage extends Component {

    renderMovie = (movieId)=>{
        return (
            <MovieCard movieId={movieId} currentList={'browse'} updateLists={this.props.updateLists} className="col"/>
        )
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <input placeholder="Search"/>
                </div>
                <div className="row">
                    {this.renderMovie('tt0848228')}
                    {this.renderMovie('tt0468569')}
                    {this.renderMovie('tt4154796')}
                </div>
            </div>
        );
    }
}

export default BrowsePage;