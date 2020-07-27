import React, {Component} from 'react';

class SearchBox extends Component {
    searchMovie = () => {
        console.log("Search button")
    }

    render() {
        return (
            <div className="card card-body">
                <input placeholder="Search" className="form-group"/>
                <small className="form-group form-text">Type a movie name</small>
                <button onClick={this.searchMovie}>Search</button>
            </div>
        );
    }
}

export default SearchBox;