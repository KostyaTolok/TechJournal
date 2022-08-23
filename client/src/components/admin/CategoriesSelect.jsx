import React, {useEffect, useState} from 'react';
import CategoriesApi from "../../api/CategoriesApi";

function CategoriesSelect(props) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = new CategoriesApi();

    async function loadCategories() {
        let response = await api.getCategories();
        const data = await response.json();
        if (response.status === 200) {
            setCategories(data);
            if (data.length > 0 && props.categoryId <= 0) {
                props.setNewsItemCategory(data[0].id);
            }
        } else {
            console.log(data.detail);
        }
    }

    useEffect(() => {
        loadCategories().then(() => setLoading(false));
    }, []);

    return (
        <>
            {!loading ?
                <select defaultValue={props.categoryId} className="form-select" name="category"
                        onChange={event => props.setNewsItemCategory(event.target.value)}>
                    {categories.map(category =>
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    )}
                </select> : null}
        </>
    );
}

export default CategoriesSelect;