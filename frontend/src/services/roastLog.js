import http from '../http-common'
const BASE_URL = "mantraCoffee"


    class RoastLogDataService {
    getAll(page = 0) {
        return http.get(`${BASE_URL}?page=${page}`);
    }
    get(id) {
        return http.get(`${BASE_URL}/${id}`)
    }

    find(query, by = "name", page = 0) {
        return http.get(`${BASE_URL}?${by}=${query}&page=${page}`);
    }

    createRoastLog(data) {
        return http.post(BASE_URL, data);
    }

    updateRoastLog(id, data) {
        return http.patch(`${BASE_URL}/${id}`, data);
    }

    deleteRoastLog(id) {
        return http.delete(`${BASE_URL}/${id}`);
    }

    getBeans(id) {
        return http.get(`/beans`);
    }
}

export default new RoastLogDataService(); 
