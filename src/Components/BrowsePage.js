import React, { useState, useContext, useEffect } from 'react';
import MovieCard from "./MovieCard";
import SearchBox from "./SearchBox";
import { Card, Spinner } from "react-bootstrap";
import { ListContext } from '../context/ListContext'
import '../assets/css/browse.css'

const BrowsePage = (props) => {
    const [movieList, setMovieList, watchMovies, setWatchMovies] = useContext(ListContext)
    const [browseMovies, setBrowseMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchQueryText, setSearchQueryText] = useState('');
    const [searchGenre, setSearchGenre] = useState(false);
    const [genreList, setGenreList] = useState([]);
    const [loadmore, setLoadmore] = useState(false);
    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        if (watchMovies.length == 0) {
            props.fetchUserWatchList()
        }
        if (movieList.length === 0) {
            props.fetchUserMovies()
        }

        renderBrowseMovies()

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!loadmore)
            return
        renderBrowseMovies()
        setLoadmore(false)
    },[loadmore])

    const handleScroll = () => {
        const currentScroll = window.scrollY
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (Math.abs(maxScroll - currentScroll) <= 200) {
            setCurrentPage(prevPage => prevPage + 1)
            if (searching) {
                searchMoviesOnQuery(searchQueryText)
            } else {
                setLoadmore(true)
            }
        }
    }

    const searchMoviesOnQuery = async (queryText) => {
        if (queryText === '') {
            setSearching(false)
            setCurrentPage(1)
            setBrowseMovies([])
            renderBrowseMovies()
            return
        } else if (queryText === searchQueryText) {
            //Load next page
        } else {
            //New search
            setSearchQueryText(queryText)
            setCurrentPage(1)
            setSearching(true)
            setBrowseMovies([])
        }
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQueryText}&page=${currentPage}&include_adult=false`
        const response = await fetch(url)
        const browseMovies = []
        if (response.ok) {
            const data = await response.json()
            const results = data['results']
            results.forEach(result => {
                const movieId = result['id']
                if (movieList.includes(movieId) || watchMovies.includes(movieId)) {
                    return
                }
                browseMovies.push(movieId)
            })
        } else {
            console.log('No browse movies')
        }
        setBrowseMovies([...browseMovies, ...browseMovies])
    }

    const renderBrowseMovies = async () => {
        console.log('render browse movies',currentPage) 
        let browseMoviesList = []
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            const results = data['results']
            results.forEach(result => {
                const movieId = result['id']
                if (movieList.includes(movieId) || watchMovies.includes(movieId)) {
                    return
                }
                browseMoviesList.push(movieId)
            })
        } else {
            console.log('No browse movies')
        }
        setBrowseMovies([...browseMovies,...browseMoviesList])
    }


    const updateLists = async (movieId, currentList, addToList) => {
        setLoading(true)
        await props.updateLists(movieId, currentList, addToList)
        let index = browseMovies.indexOf(movieId)
        if (index > -1) {
            browseMovies.splice(index, 1)
            setBrowseMovies(browseMovies)
        }
        setLoading(false)
        setCurrentPage(1)
    }

    const searchMoviesByGenreIDs = async (genreListQuery) => {
        if (genreListQuery.length === 0) {
            setSearching(false)
            setSearchGenre(false)
            setCurrentPage(1)
            setBrowseMovies([])
            renderBrowseMovies()
            return
        } else if (genreListQuery === genreList) {
            //Load next page
        } else {
            //New search
            setGenreList(genreListQuery)
            setCurrentPage(1)
            setSearchGenre(true)
            setBrowseMovies([])
        }
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=`
        url += genreList[0]
        for (let i = 1; i < genreList.length; i++) {
            url += "%2C" + genreList[1]
        }
        const response = await fetch(url)
        const newBrowseMovies = []
        if (response.ok) {
            const data = await response.json()
            const results = data['results']
            results.forEach(result => {
                const movieId = result['id']
                if (movieList.includes(movieId) || watchMovies.includes(movieId)) {
                    return
                }
                newBrowseMovies.push(movieId)
            })
        } else {
            console.log('No browse movies')
        }
        setBrowseMovies([...browseMovies,...newBrowseMovies])
    }

    return (
        <div className="">
            <div className="searchBoxContainer">
                <Card className="browsePageSearchBox">
                    <SearchBox searchMoviesOnQuery={searchMoviesOnQuery}
                                searchMoviesByGenreIDs={searchMoviesByGenreIDs}/>
                </Card>
            </div>
            <div className="browseCardsContainer row">
                    {loading && (<div className="loadingContainer">
                <span>
                    <Spinner animation="border" variant="primary" />  Fetching Data ... 
                </span>
            </div>)}
                    {!loading && browseMovies && (
                        <React.Fragment>
                            {browseMovies.map(imdbMovieId => {
                                return (<MovieCard movieId={imdbMovieId} currentList={'browse'} className="col" updateLists={updateLists} />)
                            })}
                        </React.Fragment>
                    )}
            </div>
        </div>
    );
}

export default BrowsePage;