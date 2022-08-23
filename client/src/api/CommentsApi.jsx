export default class CommentsApi {

    constructor() {
        this.url = "https://tech-journal-app.herokuapp.com/api/v1/comments";
    }

    async getComments(newsItemId) {
        return await fetch(`${this.url}/list${newsItemId ? "?news_item=" + newsItemId : ''}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    }

    async addComment(data, accessToken) {
        return await fetch(`${this.url}/create`,
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
        return await fetch(`${this.url}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
    }
}