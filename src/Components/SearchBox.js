import React, {Component} from 'react';

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.searchBoxInput = React.createRef()
    }

    searchMovie = () => {
        console.log("Search button")
        let searchBoxInput = this.searchBoxInput.current.value
        console.log("Search query = ", searchBoxInput)
        this.props.searchMoviesOnQuery(searchBoxInput)
    }

    render() {
        return (
            <div className="card card-body">
                <input placeholder="Search By Title" className="form-group" ref={this.searchBoxInput}/>
                <small className="form-group form-text">Type a movie name</small>
                <button onClick={this.searchMovie}>Search</button>
            </div>
        );
    }
}

export default SearchBox;