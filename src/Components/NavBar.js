import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const NavBar = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const renderUserBox = () => {
        if (currentUser !== '') {
            return (
                <div className="p-2 m-2">
                    <h3>Hello {currentUser}</h3>
                </div>
            )
        } else {
            return (
                <p className={"btn"} onClick={() => redirectToLink('/login')}>Login</p>
            )
        }
    }

    const redirectToLink = (link) => {
        props.history.push(link)
    }

    const logoutUser = () => {
        props.logoutUser()
        props.history.push('/')
    }

    return (
        <div className="sidenav" id="mySidenav">
            {renderUserBox()}
            <p className={"btn"} onClick={() => redirectToLink('/')}>Browse</p>
            {currentUser !== '' && (
                <div>
                    <p className={"btn"} onClick={() => redirectToLink('/mymovies')}>My Movies </p>
                    <p className={"btn"} onClick={() => redirectToLink('/watchlist')}>Watchlist</p>
                </div>
            )}
            <p className={"btn"} onClick={() => redirectToLink('/about')}>About</p>
            {currentUser !== '' && (
                <p className={"btn"} onClick={logoutUser}>Log out</p>
            )}
            <br /><br /><br />
            Info from TMDB
        </div>
    );
}

export default withRouter(NavBar);