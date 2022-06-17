import React, {useState, useContext, useEffect} from 'react';
import AuthContext from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import NewsItemsList from "./NewsItemsList";
import {Outlet} from "react-router";

function HomePage() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-md-10">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;