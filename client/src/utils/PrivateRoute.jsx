import React from "react";
import {Navigate} from "react-router";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";


function PrivateRoute({children}){
    const {user} = useContext(AuthContext);
    const isAuthenticated = user !== null;
    return isAuthenticated ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;