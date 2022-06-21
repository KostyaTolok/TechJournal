import React, {useEffect, useState} from 'react';
import {useOutletContext} from "react-router";
import {Link, useParams} from "react-router-dom";
import NewsItemsApi from "../api/NewsItemsApi";


function NewsItemsList() {
    const [newsItems, setNewsItems] = useState([]);
    const params = useParams();
    const categorySlug = params.category;
    const api = new NewsItemsApi();

    useEffect(() => {
        loadNewsItems(categorySlug);
    }, [categorySlug]);

    async function loadNewsItems(category) {
        let response = await api.getNewsItems(category);
        const data = await response.json();
        if (response.status === 200) {
            setNewsItems(data);
        } else {
            console.log(data.detail);
        }
    }

    return (
        newsItems.length <= 0 ? (
            <div className="text-center">
                <h2 className="mt-5">Нет новостей</h2>
            </div>
        ) : (
            <div className="news-list container mt-3">
                <h1>Последние новости:</h1>
                {newsItems[0] ?
                    <Link to={`${categorySlug ? '' : '/' + newsItems[0]?.category.slug + '/'}${newsItems[0]?.id}`}>
                        <div className="card bg-dark text-white main-news mb-4">
                            <img className="card-img"
                                 src={newsItems[0]?.image}
                                 alt="Main News"/>
                            <div className="card-img-overlay">
                                <h5 className="card-title">{newsItems[0]?.headline}</h5>
                                <small className="card-text">{newsItems[0]?.created_at}</small>
                                <p className="card-text">{newsItems[0]?.content}</p>
                            </div>
                        </div>
                    </Link>
                    : null}
                <div className="row row-cols-3 g-4 mb-4">
                    {newsItems.slice(1).map(item => (
                        <div key={item.id} className="col-4">
                            <Link className="news-link"
                                  to={`${categorySlug ? '' : '/' + item.category.slug + '/'}${item.id}`}>
                                <div className="card news-card">
                                    <img className="img-fluid" alt="News"
                                         src={item.image}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.headline}</h5>
                                        <small className="card-text">{item.created_at}</small>
                                        <p className="card-text news-description">{item.content}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}

export default NewsItemsList;