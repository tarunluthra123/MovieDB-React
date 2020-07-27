import React, {Component} from 'react';
import MovieCard from "./MovieCard";

class WatchlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchMovies: this.props.watchMovies,
            loading: false
        }
        console.log('watchlist page')
    }

    updateLists = (movieId, currentList, addToList) => {
        this.setState({
            loading: true
        }, async () => {
            await this.props.updateLists(movieId, currentList, addToList)
            const watchMovies = this.state.watchMovies
            let index = watchMovies.indexOf(movieId)
            if (index > -1) {
                watchMovies.splice(index, 1)
                this.setState({
                    watchMovies: watchMovies
                })
            }
            this.setState({
                loading: false
            })
        })

    }


    renderWatchListMovies = () => {
        const {loading, watchMovies} = this.state
        if (loading) {
            return (
                <p> Loading...</p>
            )
        }
        const cards = []
        for (const movieId of watchMovies) {
            cards.push(<MovieCard movieId={movieId} currentList={'watchlist'} className="col"
                                  updateLists={this.updateLists}/>)
        }
        console.log(cards)
        return cards
    }

    render() {
        const watchMovies = this.state.watchMovies
        const loading = this.state.loading
        console.log('in watchlist', watchMovies)
        return (
            <div className="p-2 m-2 row">
                {this.renderWatchListMovies()}
            </div>
        );
    }
}

export default WatchlistPage;