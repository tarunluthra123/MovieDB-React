import React, {Component} from 'react';

const genreIDs = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    Thriller: 53,
    War: 10752,
    Western: 37
}

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.searchBoxInput = React.createRef()
        this.state = {
            checkedGenreIDs: new Map()
        }
    }

    searchMoviesOnQuery = () => {
        console.log("Search button")
        let searchBoxInput = this.searchBoxInput.current.value
        console.log("Search query = ", searchBoxInput)
        this.props.searchMoviesOnQuery(searchBoxInput)
    }

    handleChange = (e) => {
        const item = e.target.name
        const isChecked = e.target.checked
        const id = genreIDs[item]
        console.log(item, isChecked, id)
        this.setState(prevState => ({checkedGenreIDs: prevState.checkedGenreIDs.set(id, isChecked)}));
    }

    renderGenreBoxes = () => {
        let boxes = []
        for (const genre in genreIDs) {
            boxes.push(
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id={`inlineCheckbox${genre}`} value={genre}
                           name={genre} onChange={this.handleChange}/>
                    <label className="form-check-label" htmlFor={`inlineCheckbox${genre}`}>{genre}</label>
                </div>
            )
        }
        return boxes
    }

    searchMoviesByGenre = () => {
        const {checkedGenreIDs} = this.state
        const genreList = []
        for (const [id, checked] of checkedGenreIDs) {
            if (checked) {
                genreList.push(id)
            }
        }
        console.log(checkedGenreIDs)
        console.log("genreList = ", genreList)
        this.props.searchMoviesByGenreIDs(genreList)
    }

    render() {
        return (
            <div className="container card card-body">
                <div className="row">
                    <div className="col-8">
                        <input placeholder="Search By Title" className="form-group" ref={this.searchBoxInput}
                               size={45}/>
                    </div>
                    <div className="col">
                        <button className="btn btn-lg btn-primary" onClick={this.searchMoviesOnQuery}>
                            Search by Title
                        </button>
                    </div>
                </div>

                <div className="card card-body m-3 p-2">
                    <div className="row">
                        <div className="col-8">
                            {this.renderGenreBoxes()}
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" onClick={this.searchMoviesByGenre}>
                                Search Movies <br/>by Genre
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBox;