import React, {useContext, useEffect, useState} from 'react';
import userIcon from '../images/user-icon.jpg';
import deleteIcon from '../images/delete.png';
import AuthContext from "../context/AuthContext";
import ReactTooltip from "react-tooltip";
import CommentsApi from "../api/CommentsApi";

function CommentsList(props) {
    const {accessToken, user} = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const newsItemId = props.newsItemId;
    const api = new CommentsApi();

    async function loadComments() {
        let response = await api.getComments(newsItemId);
        const data = await response.json();
        if (response.status === 200) {
            setComments(data);
        } else {
            console.log(data.detail);
        }
    }

    useEffect(() => {
        loadComments();
    }, []);

    async function addComment(event) {
        event.preventDefault();
        let response = await api.addComment({news_item: newsItemId, text: event.target.text.value}, accessToken);
        const data = await response.json();
        if (response.status === 201) {
            setComments([data, ...comments]);
        } else {
            console.log("Ошибка при добавлении комментария: " + data.detail);
        }
        event.target.text.value = '';
    }

    async function deleteComment(commentId) {
        let response = await api.deleteComment(commentId, accessToken);
        if (response.status === 204) {
            setComments(comments.filter(comment => comment.id !== commentId));
        } else {
            console.log("Ошибка при удалении комментария");
        }
    }

    return (
        <div>
            <h3 className="mb-3">Комментарии</h3>
            <form className="d-flex flex-row mb-3" onSubmit={addComment}>
                <input name="text" type="text" className="form-control me-2" placeholder="Введите комментарий"></input>
                <button type="submit" className="btn btn-primary">Отправить</button>
            </form>
            {comments.map(comment => (
                <div key={comment.id} className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column mb-3">
                        <div className="d-flex flex-row">
                            <img className="rounded-circle" alt="User"
                                 src={comment.author.image ?? userIcon} width="50" height="50"/>
                            <div className="d-flex flex-column justify-content-start ms-2">
                                <span className="d-block font-weight-bold">{comment.author.username}</span>
                                <small className="text-muted">{comment.created_at}</small>
                            </div>
                        </div>
                        <div className="mt-1">
                            <p>{comment.text}</p>
                        </div>
                    </div>
                    {user && (user.user_id === comment.author.id || user.is_staff) &&
                        <>
                            <button data-tip="Удалить" data-for="delete-tip" className="delete-btn"
                                    onClick={() => deleteComment(comment.id)}>
                                <img src={deleteIcon} alt="Delete" height="15" width="15"/>
                            </button>
                            <ReactTooltip id="delete-tip" place="top" type="dark" effect="solid"/>
                        </>
                    }
                </div>
            ))}
        </div>
    );
}

export default CommentsList;