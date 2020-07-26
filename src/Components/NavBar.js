import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.currentUser !== '') {
            this.setState({
                currentUser: this.props.currentUser
            })
        }
    }

    redirectToLogin = () => {
        this.props.history.push('/login')
    }

    renderUserBox = () => {
        if (this.props.currentUser !== '') {
            return (
                <div className="p-2 m-2">
                    <h3>Hello {this.props.currentUser}</h3>
                </div>
            )
        } else {
            return (
                <div className="p-1 m-1">
                    <button onClick={this.redirectToLogin}>Login</button>
                </div>
            )
        }
    }

    redirectToLink = (link) => {
        this.props.history.push(link)
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav">
                {this.renderUserBox()}
                <p onClick={() => this.redirectToLink('/')}>Browse</p>
                <p onClick={() => this.redirectToLink('/mymovies')}>My Movies </p>
                <p onClick={() => this.redirectToLink('/watchlist')}>Watchlist</p>
                <p onClick={() => this.redirectToLink('/logout')}>Log out</p>
                <p onClick={() => this.redirectToLink('/about')}>About</p>
                <br/><br/><br/>
                Info from TMDB
            </div>
        );
    }
}

export default withRouter(NavBar);