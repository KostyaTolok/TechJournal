import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {Outlet} from "react-router-dom";
import {Navigate} from "react-router";

function AdminRoute() {
    const {user} = useContext(AuthContext);
    const isAuthenticated = user !== null;
    return isAuthenticated && user.is_staff ? <Outlet/> : <Navigate to="/login"/>;
}

export default AdminRoute;