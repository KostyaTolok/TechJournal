export default class NewsItemsApi {

    constructor() {
        this.url = "https://tech-journal-app.herokuapp.com/api/v1/news"
    }

    async getNewsItems(category = null) {
        return fetch(`${this.url}/list${category ? "?category=" + category : ''}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    }

    async getNewsItem(id) {
        return fetch(`${this.url}/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    async updateNewsItem(id, data, accessToken) {
        return fetch(`${this.url}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: data
        });
    }

    async createNewsItem(data, accessToken) {
        return fetch(`${this.url}/create`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: data
        });
    }

    async deleteNewsItem(id, accessToken) {
        return fetch(`${this.url}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        });
    }
}