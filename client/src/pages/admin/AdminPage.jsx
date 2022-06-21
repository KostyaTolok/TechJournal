import React from 'react';
import {Link} from "react-router-dom";

function AdminPage() {
    return (
        <div className="container mt-4">
            <div className="list-group">
                <Link to="news" className="list-group-item list-group-item-action">
                    Новости
                </Link>
                <Link to="categories" className="list-group-item list-group-item-action">
                    Категории
                </Link>
                <Link to="users" className="list-group-item list-group-item-action">
                    Пользователи
                </Link>
            </div>
        </div>
    );
}

export default AdminPage;