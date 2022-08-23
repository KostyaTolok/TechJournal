import React, {useContext, useState} from 'react';
import registerPicture from "../images/register.svg";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import ErrorsList from "../components/ErrorsList";

function RegisterPage() {
    const {registerUser, loginUser} = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);
        let tempErrors = [];
        if (!event.target.username.value) {
            tempErrors.push('Введите имя пользователя');
        }
        if (!event.target.email.value) {
            tempErrors.push('Введите email');
        }
        if (!event.target.password.value) {
            tempErrors.push('Введите пароль');
        }
        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            let response = await registerUser(event.target.username.value,
                event.target.email.value, event.target.password.value);
            let registerData = await response.json();

            if (response.status === 200) {
                response = await loginUser(event.target.username.value, event.target.password.value);
                let loginData = await response.json();

                if (response.status === 200) {
                    navigate('/');
                } else {
                    setErrors([loginData.username, loginData.password]);
                    console.log(loginData);
                }
            } else {
                setErrors([registerData.username, registerData.email, registerData.password]);
                console.log(registerData);
            }
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6 col-lg-7 col-xl-6">
                    <img src={registerPicture} className="register-img" alt="Phone"></img>
                </div>
                <div className="col-md-6 col-lg-5 col-xl-6">
                    <h1>Регистрация</h1>
                    <ErrorsList errors={errors}/>
                    <form className="mt-2" onSubmit={handleSubmit}>
                        <div className="form-floating mb-4">
                            <input name="username" type="text" className="form-control" placeholder="Login"/>
                            <label htmlFor="username">Логин</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input name="email" type="email" className="form-control" placeholder="Email"/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input name="password" type="password" className="form-control" placeholder="Password"/>
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <div className="d-grid mb-4">
                            <button type="submit" className="btn btn-primary btn-lg">Зарегистрироваться</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;