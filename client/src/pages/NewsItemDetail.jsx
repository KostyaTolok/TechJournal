import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CommentsList from "../components/CommentsList";

function NewsItemDetail() {
    const [newsItem, setNewsItem] = useState({});
    const params = useParams();
    const newsItemId = params.id;

    async function loadNewsItem() {
        let response = await fetch(`http://127.0.0.1:8000/api/v1/news/detail/${newsItemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }, (error) => {
            console.log(error);
        });
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