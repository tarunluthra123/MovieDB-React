import React, {Component} from 'react';

class NavBar extends Component {
    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <a href="#">My Movies </a>
                <a href="#">Watchlist</a>
                <a href="#">Log out</a>
                <a href="#">About</a>
                <br/><br/><br/>
                Info from TMDB
            </div>
        );
    }
}

export default NavBar;