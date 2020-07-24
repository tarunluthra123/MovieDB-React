import React from 'react';
import './App.css';
import MovieCard from "./Components/MovieCard";

function App() {
    return (
        <div className="App">
            <div className="row">
                <MovieCard movieId={'tt0848228'} className="col-3"/>
                <MovieCard movieId={'tt0468569'} className="col-3"/>
                <MovieCard movieId={'tt4154796'} className="col-3"/>
            </div>
        </div>
    );
}

export default App;
