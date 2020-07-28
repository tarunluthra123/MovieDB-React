import React, {Component} from 'react';
import MovieCard from "./MovieCard";
import SearchBox from "./SearchBox";
import {Card} from "react-bootstrap";

class BrowsePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            browseMovies: [],
            currentPage: 1,
            loading: false,
            searching: false,
            searchQueryText: ''
        }
    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.renderBrowseMovies()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const currentScroll = window.scrollY
        const maxScroll = document.body.offsetHeight - window.innerHeight;
        const {currentPage} = this.state;

        // console.log(currentScroll, maxScroll)

        if (maxScroll - currentScroll <= 120) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
            if (this.state.searching) {
                this.searchMoviesOnQuery(this.state.searchQueryText)
            } else {
                this.renderBrowseMovies()
            }
        }
    }

    searchMoviesOnQuery = async (searchQueryText) => {
        if (searchQueryText === '') {
            this.setState({
                searching: false,
                currentPage: 1,
                browseMovies: []
            })
            this.renderBrowseMovies()
            return
        } else if (searchQueryText === this.state.searchQueryText) {
            //Load next page
        } else {
            //New search
            this.setState({
                searchQueryText: searchQueryText,
                currentPage: 1,
                searching: true,
                browseMovies: []
            })
        }
        const url = `https://api.themoviedb.org/3/search/movie?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US&query=${searchQueryText}&page=${this.state.currentPage}&include_adult=false`
        const response = await fetch(url)
        const browseMovies = []
        if (response.ok) {
            const data = await response.json()
            const results = data['results']
            results.forEach(result => {
                const movieId = result['id']
                if (this.props.movieList.includes(movieId) || this.props.watchMovies.includes(movieId)) {
                    return
                }
                browseMovies.push(movieId)
            })
        } else {
            console.log('No browse movies')
        }
        this.setState({
            browseMovies: [...this.state.browseMovies, ...browseMovies]
        })
    }

    renderBrowseMovies = async () => {
        let browseMovies = []
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.currentPage}`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            const results = data['results']
            results.forEach(result => {
                const movieId = result['id']
                if (this.props.movieList.includes(movieId) || this.props.watchMovies.includes(movieId)) {
                    return
                }
                browseMovies.push(movieId)
            })
        } else {
            console.log('No browse movies')
        }
        this.setState({
            browseMovies: [...this.state.browseMovies, ...browseMovies]
        })
    }


    updateLists = (movieId, currentList, addToList) => {
        this.setState({
            loading: true
        }, async () => {
            await this.props.updateLists(movieId, currentList, addToList)
            let browseMovies = this.state.browseMovies
            let index = browseMovies.indexOf(movieId)
            if (index > -1) {
                browseMovies.splice(index, 1)
                this.setState({
                    browseMovies: browseMovies
                })
            }
            this.setState({
                loading: false,
                currentPage: 1
            })
        })

    }


    render() {
        const {loading, browseMovies} = this.state
        return (
            <div className="">
                <div className="row" style={{flex: 'space-around'}}>
                    <Card style={{width: '50rem'}}>
                        <SearchBox searchMoviesOnQuery={this.searchMoviesOnQuery}/>
                    </Card>
                </div>
                <div className=" row">
                    {loading && (<p>Loading...</p>)}
                    {!loading && browseMovies && (
                        <React.Fragment>
                            {browseMovies.map(imdbMovieId => {
                                return (<MovieCard movieId={imdbMovieId} currentList={'browse'} className=" col"
                                                   updateLists={this.updateLists}/>)
                            })}
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

export default BrowsePage;