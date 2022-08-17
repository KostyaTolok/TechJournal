export default class CategoriesApi {

    async getCategories() {
        return await fetch("http://127.0.0.1:8000/api/v1/categories/list", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getCategory(id) {
        return await fetch(`http://127.0.0.1:8000/api/v1/categories/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async createCategory(data, accessToken) {
        return await fetch(`http://127.0.0.1:8000/api/v1/categories/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify(data)
        });
    }

    async updateCategory(id, data, accessToken) {
        return await fetch(`http://127.0.0.1:8000/api/v1/categories/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify(data)
        });
    }

    async deleteCategory(id, accessToken) {
        return await fetch(`http://127.0.0.1:8000/api/v1/categories/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }
        });
    }

}