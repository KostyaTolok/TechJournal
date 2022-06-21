import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import UsersApi from "../../api/UsersApi";
import ErrorsList from "../../components/ErrorsList";

function AdminUserDetail() {
    const {accessToken} = useContext(AuthContext);
    const {id} = useParams();
    const api = new UsersApi();
    const [user, setUser] = useState({
        username: '',
        email: '',
        is_staff: false,
        is_active: true,
    });
    const [errors, setErrors] = useState([]);

    async function loadUser() {
        let response = await api.getUser(id, accessToken);
        const data = await response.json();
        if (response.status === 200) {
            setUser(data);
        } else {
            console.log("Ошибка при получении пользователя", data);
            setErrors(["Ошибка при получении пользователя"]);
        }
    }

    async function changeUserStatus(event) {
        event.preventDefault();
        let response = await api.changeUserStatus(id, accessToken);
        if (response.status === 200) {
            setUser(prevState => {
                return {
                    ...prevState,
                    is_active: !user.is_active
                }
            });
        } else {
            console.log("Ошибка при изменении статуса пользователя: ", response.json());
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Пользователь:</h1>
            <ErrorsList errors={errors}/>
            <div className="row mt-3">
                <div className="col-6">
                    <h4>Email:</h4>
                </div>
                <div className="col-6">
                    <h4>{user.email}</h4>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6">
                    <h4>Имя:</h4>
                </div>
                <div className="col-6">
                    <h4>{user.username}</h4>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6">
                    <h4>Роль:</h4>
                </div>
                <div className="col-6">
                    {user.is_staff ? <h4>Администратор</h4> : <h4>Пользователь</h4>}
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-6">
                    <h4>Активен:</h4>
                </div>
                <div className="col-6">
                    {user.is_active ? <h4>Да</h4> : <h4>Нет</h4>}
                </div>
            </div>
            <div className="d-grid mt-2 mb-2">
                {user.is_active ?
                    <button className="btn btn-danger" onClick={changeUserStatus}>Заблокировать</button>
                    :
                    <button className="btn btn-success" onClick={changeUserStatus}>Разблокировать</button>
                }
            </div>
        </div>
    );
}

export default AdminUserDetail;