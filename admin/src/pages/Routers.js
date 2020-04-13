import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login';

export default function Routers() {
    return (
        <div>
            <Router>
                <Route path='/login/' exact component={Login} />
            </Router>
        </div>
    )
}
