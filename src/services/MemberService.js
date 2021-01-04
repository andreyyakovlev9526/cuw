import http from "../http-common";

const members = `/members/`;

class MemberService {

  getAll() {
    return http.get(members);
  }

  create(data) {
    return http.post(members, data);
  }

  get(id) {
    return http.get(members + `${id}`);
  }

  update(id, data) {
    return http.put(members + `${id}`, data);
  }

  delete(id) {
    return http.delete(members + `${id}`);
  }

}

export default new MemberService();
