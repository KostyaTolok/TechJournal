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
import AdminPage from "../pages/admin/AdminPage";
import AdminNewsList from "../pages/admin/AdminNewsList";
import AdminNewsItemDetail from "../pages/admin/AdminNewsItemDetail";
import AdminUsersList from "../pages/admin/AdminUsersList";
import AdminUserDetail from "../pages/admin/AdminUserDetail";
import AdminCategoriesList from "../pages/admin/AdminCategoriesList";
import AdminCategoryDetail from "../pages/admin/AdminCategoryDetail";

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
                        <Route index element={<AdminPage/>}/>
                        <Route path="news" element={<AdminNewsList/>}/>
                        <Route path="news/:id" element={<AdminNewsItemDetail/>}/>
                        <Route path="news/create" element={<AdminNewsItemDetail/>}/>
                        <Route path="users" element={<AdminUsersList/>}/>
                        <Route path="users/:id" element={<AdminUserDetail/>}/>
                        <Route path="categories" element={<AdminCategoriesList/>}/>
                        <Route path="categories/:id" element={<AdminCategoryDetail/>}/>
                        <Route path="categories/create" element={<AdminCategoryDetail/>}/>
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default Main;
