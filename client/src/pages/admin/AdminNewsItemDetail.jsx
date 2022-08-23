import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import NewsItemsApi from "../../api/NewsItemsApi";
import ErrorsList from "../../components/ErrorsList";
import CategoriesSelect from "../../components/admin/CategoriesSelect";

function AdminNewsItemDetail(props) {
    const {accessToken} = useContext(AuthContext);
    const {id} = useParams();
    const [newsItem, setNewsItem] = useState({
        headline: '',
        image: '',
        content: '',
        created_at: '',
        category: 0,
    });
    const [errors, setErrors] = useState([]);
    const api = new NewsItemsApi();
    const navigate = useNavigate();
    const [currentImageFile, setCurrentImageFile] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadNewsItem() {
        if (id) {
            const response = await api.getNewsItem(id);
            const data = await response.json();
            if (response.status === 200) {
                setNewsItem(data);
            } else {
                setErrors(data.detail);
            }
        }
    }

    async function handleChange(event) {
        setNewsItem({...newsItem, [event.target.name]: event.target.value});
    }

    async function setNewsItemCategory(categoryId) {
        setNewsItem({...newsItem, category: categoryId});
    }

    useEffect(() => {
        loadNewsItem().then(() => setLoading(false));
    }, []);

    async function handleAddImage(event) {
        event.preventDefault();
        let fileTypes = ['image/png', 'image/jpeg', "image/jpg"];
        let currentFiles = event.target.files;
        let tempErrors = [];
        if (currentFiles.length === 0) {
            tempErrors.push("Изображение новости не выбрано");
        } else if (!fileTypes.includes(currentFiles[0].type)) {
            tempErrors.push("Неверный формат изображения");
        } else if (currentFiles[0].size > 1000000) {
            tempErrors.push("Размер изображения превышает 1 мб");
        }
        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            let tempImage = URL.createObjectURL(currentFiles[0]);
            setCurrentImageFile(currentFiles[0]);
            setNewsItem({...newsItem, image: tempImage});
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let tempErrors = [];
        if (newsItem.headline === '') {
            tempErrors.push("Заголовок новости не заполнен");
        }
        if (newsItem.content === '') {
            tempErrors.push("Текст новости не заполнен");
        }
        if (newsItem.category <= 0) {
            tempErrors.push("Категория новости не выбрана");
        }
        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            let formData = new FormData();
            formData.append('headline', newsItem.headline);
            formData.append('content', newsItem.content);
            formData.append('category', newsItem.category);
            if (currentImageFile) {
                formData.append('image', currentImageFile, currentImageFile.name);
            }
            let response;
            if (id) {
                response = await api.updateNewsItem(id, formData, accessToken);
            } else {
                response = await api.createNewsItem(formData, accessToken);
            }
            const data = await response.json();
            if (response.status === 200) {
                console.log("Новость обновлена");
                navigate("/admin/news");
            } else if (response.status === 201) {
                console.log("Новость создана");
                navigate("/admin/news");
            } else {
                console.log("Ошибки при сохранении новости: ", data)
                setErrors(["Не удалось сохранить новость"]);
            }
        }
    }

    async function handleDelete(event) {
        event.preventDefault();
        let response = await api.deleteNewsItem(id, accessToken);
        if (response.status === 204) {
            console.log("Новость удалена");
            navigate("/admin/news");
        } else {
            console.log("Ошибки при удалении новости: ", await response.json());
        }
    }

    return (
        <div className="container mt-3">
            <h1>Новость:</h1>
            <ErrorsList errors={errors}/>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="headline">Заголовок:</label>
                    <input name="headline" type="text" onChange={handleChange}
                           className="form-control" value={newsItem.headline}/>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="category">Категория:</label>
                    {!loading ? <CategoriesSelect name="category" categoryId={newsItem.category}
                                                  setNewsItemCategory={setNewsItemCategory}/> : null}
                </div>
                <img className="img-fluid pt-3 pb-3" alt="News" src={newsItem.image}/>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="image">Изображение:</label>
                    <input name="image" type="file" className="form-control" onChange={handleAddImage}/>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="content">Текст новости:</label>
                    <textarea rows="10" name="content" className="form-control" value={newsItem.content}
                              onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-dark mb-3">Сохранить</button>
                <button type="button" className="btn btn-danger mb-3 ms-3" onClick={handleDelete}>Удалить</button>
            </form>
        </div>
    );
}

export default AdminNewsItemDetail;