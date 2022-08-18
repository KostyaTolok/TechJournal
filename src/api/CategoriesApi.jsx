export default class CategoriesApi {
    constructor() {
        this.url = "https://tech-journal-app.herokuapp.com/api/v1/categories";
    }

    async getCategories() {
        return await fetch(`${this.url}/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getCategory(id) {
        return await fetch(`${this.url}/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async createCategory(data, accessToken) {
        return await fetch(`${this.url}/categories/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify(data)
        });
    }

    async updateCategory(id, data, accessToken) {
        return await fetch(`${this.url}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            body: JSON.stringify(data)
        });
    }

    async deleteCategory(id, accessToken) {
        return await fetch(`${this.url}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }
        });
    }

}