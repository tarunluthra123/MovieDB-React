import React, { createContext, useState } from 'react';

export const ListContext = createContext();

export const ListProvider = (props) => {
    const [movieList, setMovieList] = useState([])
    const [watchMovies,setWatchMovies] = useState([])
    
    return (
        <ListContext.Provider value={[movieList, setMovieList,watchMovies,setWatchMovies]}>
            {props.children}
        </ListContext.Provider>
    )
}