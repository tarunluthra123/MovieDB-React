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

    renderUserBox = () => {
        if (this.props.currentUser !== '') {
            return (
                <div className="p-2 m-2">
                    <h3>Hello {this.props.currentUser}</h3>
                </div>
            )
        } else {
            return (
                <p className={"btn"} onClick={() => this.redirectToLink('/login')}>Login</p>
            )
        }
    }

    redirectToLink = (link) => {
        this.props.history.push(link)
    }

    logoutUser = () => {
        this.props.logoutUser()
        this.props.history.push('/')
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav">
                {this.renderUserBox()}
                <p className={"btn"} onClick={() => this.redirectToLink('/')}>Browse</p>
                {this.props.currentUser !== '' && (
                    <div>
                        <p className={"btn"} onClick={() => this.redirectToLink('/mymovies')}>My Movies </p>
                        <p className={"btn"} onClick={() => this.redirectToLink('/watchlist')}>Watchlist</p>
                    </div>
                )}
                <p className={"btn"} onClick={() => this.redirectToLink('/about')}>About</p>
                {this.props.currentUser !== '' && (
                    <p className={"btn"} onClick={this.logoutUser}>Log out</p>
                )}
                <br/><br/><br/>
                Info from TMDB
            </div>
        );
    }
}

export default withRouter(NavBar);