export default class UsersApi {

    async getUsers(accessToken) {
        return fetch("http://127.0.0.1:8000/api/v1/users/list", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }

    async getUser(id, accessToken) {
        return fetch(`http://127.0.0.1:8000/api/v1/users/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }

    async changeUserStatus(id, accessToken) {
        return fetch(`http://127.0.0.1:8000/api/v1/users/change-status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        });
    }
}