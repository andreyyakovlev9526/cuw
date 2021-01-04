import http from "../http-common";

const songList = `/song-list/`;

class SongListService {

  getAll() {
    return http.get(songList);
  }

  create(data) {
    return http.post(songList, data);
  }

  get(id) {
    return http.get(songList +`${id}`);
  }

  update(id, data) {
    return http.put(songList + `${id}`, data);
  }

  delete(id) {
    return http.delete(songList + `${id}`);
  }

}

export default new SongListService();