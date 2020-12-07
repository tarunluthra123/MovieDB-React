import React,{useContext} from 'react';
import { UserContext } from '../context/UserContext'
import { Link, withRouter, useHistory } from 'react-router-dom'
import '../assets/css/layout.css'

const Layout = (props) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const history = useHistory()

    function logoutMethod() {
        props.logoutUser()
        history.push('/')
    }

    return (
        <div className="layoutContainer">
            <div class="topBar">        
                <span>Movie DB</span>
                <nav>
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
            </div>
            <div className="displayContainer">
                {props.children}
            </div>
        </div>
    );
}

export default withRouter(Layout);
