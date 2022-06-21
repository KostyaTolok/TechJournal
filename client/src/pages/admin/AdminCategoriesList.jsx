import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import CategoriesApi from "../../api/CategoriesApi";

function AdminCategoriesList() {
    const api = new CategoriesApi();
    const [categories, setCategories] = useState([]);

    async function loadCategories() {
        let response = await api.getCategories();
        const data = await response.json();
        if (response.status === 200) {
            setCategories(data);
        } else {
            console.log(data.detail);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Категории:</h1>
            <div className="list-group">
                {categories.map(category => (
                    <Link key={category.id} to={`${category.id}`}
                          className="list-group-item list-group-item-action">
                        <h5 className="mb-1">{category.name}</h5>
                        <small className="text-muted">{category.created_at}</small>
                    </Link>
                ))}
            </div>
            <Link to="create" className="btn btn-dark mt-3 mb-3">Добавить категорию</Link>
        </div>
    );
}

export default AdminCategoriesList;