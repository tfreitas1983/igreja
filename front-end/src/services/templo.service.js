import http from "../http-common"

class TemploDataService {
    buscarTodos() {
        return http.get("/membros/templo")
    }
    buscar(id) {
        return http.get(`/membros/templo/${id}`)
    }
    cadastrar(data) {
        return http.post("/membros/templo", data)
    }
    editar(id, data) {
        return http.put(`/membros/templo/${id}`, data)
    }
}


export default new TemploDataService()