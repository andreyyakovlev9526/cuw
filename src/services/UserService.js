import http from "../http-common";

const users = `/users/`;

class UserService {

    getAll() {
        return http.get(users);
    }

    create(data) {
        return http.post(users, data);
    }

    get(id) {
        return http.get(users + `${id}`);
    }

    update(id, data) {
        return http.put(users + `${id}`, data);
    }

    delete(id) {
        return http.delete(users + `${id}`);
    }

}

export default new UserService();