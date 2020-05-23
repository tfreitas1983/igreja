import http from "../http-common"

class TemploDataService {
    buscar() {
        return http.get("/membros/templo")
    }
    cadastrar(data) {
        return http.post("/membros/templo", data)
    }
    editar(id, data) {
        return http.put(`/membros/templo/${id}`, data)
    }
}


export default new TemploDataService()