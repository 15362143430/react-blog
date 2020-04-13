import React from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import Login from './pages/Login';
import AdminIndex from './pages/AdminIndex';
import PrivateRoute from './components/PrivateRoute';
import LoginRoute from './components/LoginRoute';

export default function Routers() {
    return (
        <div>
            <Router>
                <Route path='/login/' exact component={Login} />
                <LoginRoute path='/login/' component={Login} />
                {/* <Route path='/index/' exact component={AdminIndex} /> */}
                <PrivateRoute path='/index/' component={AdminIndex} />
                {/* <Redirect from='/*' to='/login' /> */}
            </Router>
        </div>
    )
}
