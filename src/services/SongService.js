import http from "../http-common";

const songs = `/songs/` ;

class SongService {

  getAll() {
    return http.get(songs);
  }

  create(data) {
    return http.post(songs, data);
  }

  get(id) {
    return http.get(songs + `${id}`);
  }

  update(id, data) {
    return http.put(songs + `${id}`, data);
  }

  delete(id) {
    return http.delete(songs + `${id}`);
  }

}

export default new SongService();
