import http from "../http-common"

class MembroDataService {
    buscarTodos() {
        return http.get("/membros")
    }

    buscarUm(id) {
        return http.get(`/membros/${id}`)
    }

    cadastrar(data) {
        return http.post("/membros", data)
    }

    editar(id, data) {
        return http.put(`/membros/${id}`, data)
    }

    apagar(id) {
        return http.delete(`/membros/${id}`)
    }

    apagarTodos() {
        return http.delete(`/membros`)
    }

    buscarNome(nome) {
        return http.get(`/membros?nome=${nome}`)
    }

  cadastrarImagem(file) {
        return http.post("/membros/files", file)
    } 
}

export default new MembroDataService()