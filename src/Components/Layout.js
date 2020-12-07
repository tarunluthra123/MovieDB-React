import React,{ useContext, useRef} from 'react';
import { UserContext } from '../context/UserContext'
import { Link, withRouter, useHistory } from 'react-router-dom'
import '../assets/css/layout.css'

const Layout = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const navRef = useRef();
    const displayContainerRef = useRef();
    const history = useHistory()

    function logoutMethod() {
        props.logoutUser()
        history.push('/')
    }

    function toggleSideNav() {
        navRef.current.classList.toggle('active')
        displayContainerRef.current.classList.toggle('active')
    }

    return (
        <div className="layoutContainer">
            <div className="topBar">        
                <span>Movie DB</span>
                <nav ref={navRef}>
                    <Link to='/'>Browse</Link>
                    <Link to='mymovies'>My Movies</Link>
                    <Link to='watchlist'>Watchlist</Link>
                    {!currentUser &&
                        <Link to='/login'>Login</Link>}
                    {!currentUser &&
                        <Link to='/signup'>Signup</Link>}
                    {currentUser &&
                        <a href="#" onClick={logoutMethod}>Log out</a> }
                </nav>
                <div className="hamburger" onClick={toggleSideNav}>
                    <div className="line line1" />
                    <div className="line line2" />
                    <div className="line line3" />
                </div>
            </div>
            <div className="displayContainer" ref={displayContainerRef}>
                {props.children}
            </div>
        </div>
    );
}

export default withRouter(Layout);
