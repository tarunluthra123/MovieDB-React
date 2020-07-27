import React, {Component} from 'react';
import imdbLogo from '../imdb_logo.png'

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: props.movieId,
            loading: true
        }
    }

    componentDidMount() {
        this.fetchData(this.props.movieId).then(() => console.log('MoviePage loaded'))
    }

    fetchData = async (movieId) => {
        this.setState({
            loading: true
        }, async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US`
            // const url = `https://api.themoviedb.org/3/find/${movieId}?api_key=d58582022280bcdb78bf8e7f96517a62&language=en-US&external_source=imdb_id`
            const res = await fetch(url)
            if (res.ok) {
                const movie = await res.json()
                this.setState({
                    movie: movie,
                    error: null,
                    loading: false
                })
            } else {
                const error = (await res.json()).message
                this.setState({
                    error: error,
                    loading: false
                })
            }
        })
    }

    renderGenres = () => {
        const genres = this.state.movie.genres
        const badges = []
        for (const obj of genres) {
            const name = obj.name
            badges.push(<span className="badge badge-light m-2 p-2"><h4>{name}</h4></span>)
        }
        return badges
    }


    render() {
        const {loading, movie} = this.state
        if (loading) {
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }
        var sectionStyle = {
            width: "100%",
            height: "900px",
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };
        return (
            <div>
                <section style={sectionStyle}>
                    <div className="row m-5">
                        <div className="col-8 p-2 m-2">
                            <h1 align="center" className="display-3">{movie.original_title}</h1>
                            <div className="row">
                                <div className="col">
                                    {this.renderGenres()}
                                </div>
                                <div className="col-3 moviePageReleaseDate">
                                <span className="badge btn-outline-info m-2 p-2">
                                {movie.release_date}
                                </span>
                                </div>
                            </div>
                            <div className="row moviePageOverview m-2 p-2">
                                {movie.overview}
                            </div>
                            <div className="row">
                                <a href={`https:/imdb.com/title/${movie.imdb_id}`} target={'_blank'}>
                                    <img src={imdbLogo} height={"100"} alt={"IMDB"}/>
                                </a>
                            </div>
                        </div>
                        <div className="col p-2 m-2">
                            <img src={`https://image.tmdb.org/t/p/original/${movie && movie.poster_path}`}
                                 alt={`${movie.original_title}`} height="500"/>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default MoviePage;