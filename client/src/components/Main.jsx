import React from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Header from "./Header";
import PrivateRoute from "../utils/PrivateRoute";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import NewsItemsList from "../pages/NewsItemsList";
import NewsItemDetail from "../pages/NewsItemDetail";
import AdminRoute from "../utils/AdminRoute";

function Main() {
    return (
        <>
            <Header/>
            <main className="mt-5">
                <Routes>
                    <Route path="/" element={<HomePage/>}>
                        <Route index element={<NewsItemsList/>}/>
                        <Route path=":category" element={<NewsItemsList/>}/>
                        <Route path=":category/:id" element={<NewsItemDetail/>}/>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                    <Route path="/admin" element={<AdminRoute/>}>
                        <Route index element={<NewsItemsList/>}/>
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default Main;
