export default class CommentsApi {

    async getComments(newsItemId) {
        return await fetch(`http://127.0.0.1:8000/api/v1/comments/list${newsItemId ? "?news_item=" + newsItemId : ''}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    }

    async addComment(data, accessToken) {
        return await fetch(`http://127.0.0.1:8000/api/v1/comments/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify(data)
            });
    }

    async deleteComment(id, accessToken) {
        return await fetch(`http://127.0.0.1:8000/api/v1/comments/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
    }
}