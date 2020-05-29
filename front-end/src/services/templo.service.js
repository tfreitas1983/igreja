import http from "../http-common"

class TemploDataService {
    buscarTodos() {
        return http.get("/templo")
    }
    buscar(id) {
        return http.get(`/templo/${id}`)
    }
    cadastrar(data) {
        return http.post("/templo", data)
    }
    editar(id, data) {
        return http.put(`/templo/${id}`, data)
    }
}

export default new TemploDataService()