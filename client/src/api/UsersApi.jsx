export default class UsersApi {
    constructor() {
        this.url = "https://tech-journal-app.herokuapp.com/api/v1/users";
    }

    async getUsers(accessToken) {
        return fetch(`${this.url}/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }

    async getUser(id, accessToken) {
        return fetch(`${this.url}/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }

    async changeUserStatus(id, accessToken) {
        return fetch(`${this.url}/change-status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        });
    }
}