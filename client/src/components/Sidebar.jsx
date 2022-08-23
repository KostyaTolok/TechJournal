import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import CategoriesApi from "../api/CategoriesApi";

function Sidebar() {
    const [categories, setCategories] = useState([]);
    const api = new CategoriesApi();
    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        let response = await api.getCategories();
        const data = await response.json();
        if (response.status === 200) {
            setCategories(data);
        } else {
            console.log(data.detail);
        }
    }

    return (
        <nav id="sidebar" className="mt-3">
            <h2>Категории</h2>
            <div className="list-group list-group-flush">
                {categories.map(category => (
                    <Link to={`/${category.slug}`} key={category.id}
                          className="list-group-item list-group-item-action">{category.name}</Link>
                ))}
            </div>
        </nav>
    );
}

export default Sidebar;