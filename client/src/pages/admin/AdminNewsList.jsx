import React, {useEffect, useState} from 'react';
import NewsItemsApi from "../../api/NewsItemsApi";
import {Link} from "react-router-dom";

function AdminNewsList() {
    const api = new NewsItemsApi();
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        loadNewsItems();
    }, []);

    async function loadNewsItems() {
        let response = await api.getNewsItems();
        const data = await response.json();
        if (response.status === 200) {
            setNewsItems(data);
        } else {
            console.log(data.detail);
        }
    }

    return (
        <div className="container mt-4">
            <h1>Новости:</h1>
            <div className="list-group">
                {newsItems.map(item => (
                    <Link key={item.id} to={`${item.id}`} className="list-group-item list-group-item-action">
                        <h5 className="mb-1">{item.headline}</h5>
                        <small className="text-muted">{item.created_at}</small>
                    </Link>
                ))}
            </div>
            <Link to="create" className="btn btn-dark mt-3 mb-3">Добавить новость</Link>
        </div>
    );
}

export default AdminNewsList;