import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";
import loginPicture from '../images/login.svg';
import ErrorsList from "../components/ErrorsList";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    let {loginUser, setTokens} = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);
        let tempErrors = [];

        if (!event.target.username.value) {
            tempErrors.push('Введите имя пользователя');
        }
        if (!event.target.password.value) {
            tempErrors.push('Введите пароль');
        }

        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            let response = await loginUser(event.target.username.value, event.target.password.value);
            let data = await response.json();
            if (response.status === 200) {
                setTokens(data.access, data.refresh);
                navigate('/');
            } else {
                setErrors([data.detail]);
                console.log(data.detail);
            }
        }
    }

    return (
        <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6 col-lg-7 col-xl-6">
                    <img src={loginPicture} className="login-img" alt="Phone"></img>
                </div>
                <div className="col-md-6 col-lg-5 col-xl-6">
                    <h1>Вход в аккаунт</h1>
                    <ErrorsList errors={errors}/>
                    <form className="mt-2" onSubmit={handleSubmit}>
                        <div className="form-floating mb-4">
                            <input name="username" type="text" className="form-control" placeholder="Login"/>
                            <label htmlFor="username">Логин</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input name="password" type="password" className="form-control" placeholder="Password"/>
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg">Войти в аккаунт</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;