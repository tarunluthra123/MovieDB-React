import React, {Component} from 'react';
import MovieCard from "./MovieCard";

class BrowsePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            browseMovies: []
        }
    }


    componentDidMount() {
        this.renderBrowseMovies()
    }

    renderMovie = (movieId) => {
        return (
            <MovieCard movieId={movieId} currentList={'browse'} updateLists={this.props.updateLists} className="col"/>
        )
    }

    renderBrowseMovies = async () => {
        let browseMovies = []
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            const results = data['results']
            results.forEach(result =>{
                const movieId = result['id']
                browseMovies.push(movieId)
            })
        }
        else {
            console.log('No browse movies')
        }
        this.setState({
            browseMovies:browseMovies
        })
    }

    render() {
        const browseMovies = this.state.browseMovies
        return (
            <div className="container">
                <div className="row">
                    <input placeholder="Search"/>
                </div>
                <div className="row">
                    {/*{this.renderMovie('tt0848228')}*/}
                    {/*{this.renderMovie('tt0468569')}*/}
                    {/*{this.renderMovie('tt4154796')}*/}
                    {this.renderMovie(347158)}
                        {browseMovies && (
                            <React.Fragment>
                                {browseMovies.map(imdbMovieId => {
                                    return (<MovieCard movieId={imdbMovieId} currentList={'browse'} className="col"
                                                       updateLists={this.props.updateLists}/>)
                                })}
                            </React.Fragment>
                        )}
                </div>
            </div>
        );
    }
}

export default BrowsePage;