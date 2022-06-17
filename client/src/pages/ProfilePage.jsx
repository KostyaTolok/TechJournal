import React, {useContext, useEffect, useState} from 'react';
import userIcon from '../images/user-icon.jpg';
import logoutIcon from '../images/logout.png';
import AuthContext from "../context/AuthContext";
import ErrorsList from "../components/ErrorsList";

function ProfilePage() {
    const {accessToken, logoutUser} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        image: '',
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function loadUserInfo() {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                setUserInfo({username: data.user.username, email: data.user.email, image: data.image});
            } else {
                console.log(data.detail);
            }
        }

        loadUserInfo();
    }, [accessToken]);

    function handleChange(event) {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);
        let tempErrors = [];
        if (!userInfo.username) {
            tempErrors.push('Введите имя пользователя');
        }
        if (!userInfo.email) {
            tempErrors.push('Введите email');
        }
        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            let response = await fetch('http://127.0.0.1:8000/api/v1/auth/profile/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    image: userInfo.image, user: {
                        username: userInfo.username,
                        email: userInfo.email
                    }
                })
            });
            const data = await response.json();
            if (response.status === 200) {
                setUserInfo({username: data.user.username, email: data.user.email, image: data.image});
                alert('Данные успешно обновлены');
            } else {
                setErrors(["Ошибка при обновлении профиля"]);
            }
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3 border-end text-center">
                    <img className="rounded-circle mt-5 user-image"
                         src={userInfo.image ? userInfo.image : userIcon}
                         alt="User"/>
                    <h5 className="mt-3">{userInfo.username}</h5>
                    <p className="text-black-50 mt-3">{userInfo.email}</p>
                </div>
                <div className="col-md-9">
                    <h4 className="mt-4">Настройка профиля</h4>
                    <ErrorsList errors={errors}/>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="form-floating mb-4">
                            <input name="username" type="text"
                                   className="form-control" placeholder="Login"
                                   value={userInfo.username} onChange={handleChange}/>
                            <label htmlFor="username">Логин</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input name="email" type="text"
                                   className="form-control" placeholder="Email"
                                   value={userInfo.email} onChange={handleChange}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark btn-lg">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex justify-content-end align-end mt-2">
                <a onClick={logoutUser} href="/"><img className="logout-icon" src={logoutIcon} alt="Logout"/></a>
            </div>
        </div>
    );
}

export default ProfilePage;