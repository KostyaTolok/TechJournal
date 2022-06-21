export default class NewsItemsApi {

    async getNewsItems(category = null) {
        return fetch(`http://127.0.0.1:8000/api/v1/news/list${category ? "?category=" + category : ''}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    }

    async getNewsItem(id) {
        return fetch(`http://127.0.0.1:8000/api/v1/news/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    async updateNewsItem(id, data, accessToken) {
        return fetch(`http://127.0.0.1:8000/api/v1/news/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: data
        });
    }

    async createNewsItem(data, accessToken) {
        return fetch(`http://127.0.0.1:8000/api/v1/news/create`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: data
        });
    }

    async deleteNewsItem(id, accessToken) {
        return fetch(`http://127.0.0.1:8000/api/v1/news/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        });
    }
}