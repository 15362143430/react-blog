import React from 'react'
import { Route } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...props }) => {
    return <Route {...props} render={(p) => {
        sessionStorage.clear();
        return <Component />

    }} />
}
export default PrivateRoute