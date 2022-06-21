import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CommentsList from "../components/CommentsList";
import NewsItemsApi from "../api/NewsItemsApi";

function NewsItemDetail() {
    const [newsItem, setNewsItem] = useState({});
    const params = useParams();
    const newsItemId = params.id;
    const api = new NewsItemsApi();

    async function loadNewsItem() {
        let response = await api.getNewsItem(newsItemId);
        const data = await response.json();
        if (response.status === 200) {
            setNewsItem(data);
        } else {
            console.log(data.detail);
        }
    }

    useEffect(() => {
        loadNewsItem();
    }, []);

    return (
        <div className="mt-4 ps-4">
            <h1>{newsItem?.headline}</h1>
            <small className="text-muted">{newsItem?.created_at}</small>
            <img className="img-fluid pt-3 pb-3" alt="News" src={newsItem?.image}/>
            <p className="news-content">{newsItem?.content}</p>
            <CommentsList newsItemId={newsItemId}/>
        </div>
    );
}

export default NewsItemDetail;