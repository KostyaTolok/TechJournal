import React from "react";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

function Header() {
    const {user} = useContext(AuthContext);

    return (
        <header>
            <div className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark shadow-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand">TechJournal</Link>
                    <button className="navbar-toggler" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Главная</Link>
                            </li>
                            {user && user.is_staff &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">Администрирование</Link>
                                </li>
                            }
                        </ul>
                        <ul className="navbar-nav">
                            {
                                user ? (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Личный кабинет</Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Вход в аккаунт</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">Регистрация</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;
