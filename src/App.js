import React from 'react';
import './App.css';
import MovieCard from "./Components/MovieCard";
import NavBar from "./Components/NavBar";

class App extends React.Component {
    componentDidMount() {
        this.fetchData().then(console.log)
    }

    fetchData = async () => {
        const res = await fetch('/ping')
        if (res.ok) {
            console.log(res)
            const data = await res.json()
            console.log("data = ", data)
        }
    }

    render() {
        return (
            <div className="App">
                <div className="row">
                    <div className="col-2">
                        <NavBar currentUserName={'tarun'}/>
                    </div>
                    <div className="col" id="main">
                        <div className="row">
                            <MovieCard movieId={'tt0848228'} className="col"/>
                            <MovieCard movieId={'tt0468569'} className="col"/>
                            <MovieCard movieId={'tt4154796'} className="col"/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
