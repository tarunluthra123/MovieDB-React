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
        if (watchMovies.length === 0) {
            return (
                <p><h4>
                    This list includes the movies that you wish to watch later. You do not have any movies currently in
                    this list.
                    Go back to Browse menu to add some movies to this list.
                </h4></p>
            )
        }
        const cards = []
        for (const movieId of watchMovies) {
            cards.push(<MovieCard movieId={movieId} currentList={'watchlist'} className="col"
                                  updateLists={this.updateLists} currentUser={this.props.currentUser}/>)
        }
        console.log(cards)
        return cards
    }

    render() {
        const watchMovies = this.state.watchMovies
        console.log('in watchlist', watchMovies)
        return (
            <div className="p-2 m-2 row">
                {this.renderWatchListMovies()}
            </div>
        );
    }
}

export default WatchlistPage;