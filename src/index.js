import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'
import { ListProvider } from './context/ListContext'

ReactDOM.render(
    <Router>
        <UserProvider>
            <ListProvider>
                <Route exact path='/' component={App} />
            </ListProvider>
        </UserProvider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
