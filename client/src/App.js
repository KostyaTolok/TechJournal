import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import Main from "./components/Main";
import {AuthContextProvider} from "./context/AuthContext";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Router>
                <AuthContextProvider>
                    <Main/>
                </AuthContextProvider>
            </Router>
            <Footer/>
        </>
    );
}

export default App;
