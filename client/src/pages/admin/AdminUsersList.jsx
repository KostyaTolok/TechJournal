import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import UsersApi from "../../api/UsersApi";
import AuthContext from "../../context/AuthContext";

function AdminUsersList() {
    const {accessToken} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const api = new UsersApi();

    async function loadUsers() {
        let response = await api.getUsers(accessToken);
        const data = await response.json();
        if (response.status === 200) {
            setUsers(data);
        } else {
            console.log(data.detail);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Пользователи:</h1>
            <div className="list-group">
                {users.map(user => (
                    <Link key={user.id} to={`${user.id}`} className="list-group-item list-group-item-action">
                        <h5 className="mb-1">{user.username}</h5>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AdminUsersList;