import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import CategoriesApi from "../../api/CategoriesApi";
import ErrorsList from "../../components/ErrorsList";
import {useNavigate, useParams} from "react-router-dom";

function AdminCategoryDetail() {
    const {accessToken} = useContext(AuthContext);
    const [category, setCategory] = useState({
        name: '',
        slug: '',
    });
    const [errors, setErrors] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const api = new CategoriesApi();

    async function loadCategory() {
        if (id) {
            const response = await api.getCategory(id);
            const data = await response.json();
            if (response.status === 200) {
                setCategory(data);
            } else {
                setErrors(data.detail);
            }
        }
    }

    async function handleChange(event) {
        setCategory({...category, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        loadCategory();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        let tempErrors = [];
        if (category.name.length === 0) {
            tempErrors.push("Название категории не заполнено");
        }
        if (category.slug.length === 0) {
            tempErrors.push("Слаг категории не заполнен");
        }
        if (tempErrors.length > 0) {
            setErrors(tempErrors);
        } else {
            if (id) {
                let response = await api.updateCategory(id, category, accessToken);
                if (response.status === 200) {
                    navigate("/admin/categories");
                } else {
                    let data = await response.json();
                    setErrors("Ошибка при обновлении категории");
                    console.log("Ошибка при обновлении категории: ", data);
                }
            } else {
                let response = await api.createCategory(category, accessToken);
                if (response.status === 201) {
                    navigate("/admin/categories");
                } else {
                    let data = await response.json();
                    setErrors("Ошибка при создании категории");
                    console.log("Ошибка при создании категории: ", data);
                }
            }
        }
    }

    async function handleDelete(event) {
        event.preventDefault();
        let response = await api.deleteCategory(id, accessToken);
        if (response.status === 204) {
            navigate("/admin/categories");
        } else {
            let data = await response.json();
            setErrors("Ошибка при удалении категории");
            console.log("Ошибка при удалении категории: ", data);
        }
    }

    return (
        <div className="container mt-4">
            <h1>Категория:</h1>
            <ErrorsList errors={errors}/>
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="name">Название</label>
                    <input type="text" className="form-control mt-2" name="name" value={category.name}
                           onChange={handleChange}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="slug">Слаг</label>
                    <input type="text" className="form-control mt-2" name="slug" value={category.slug}
                           onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-dark mb-3" onClick={handleSubmit}>Сохранить</button>
                <button type="submit" className="btn btn-danger mb-3 ms-2" onClick={handleDelete}>Удалить</button>
            </form>
        </div>
    );
}

export default AdminCategoryDetail;