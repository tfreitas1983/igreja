import http from "../http-common"

class CategoriaDataService {
    buscarTodos() {
        return http.get("/financeiro/categorias")
    }

    buscarUm(id) {
        return http.get(`/financeiro/categorias/${id}`)
    }

    cadastrar(data) {
        return http.post("/financeiro/categorias", data)
    }

    editar(id, data) {
        return http.put(`/financeiro/categorias/${id}`, data)
    }

    buscarDescricao(descricao) {
        return http.get(`/financeiro/categorias?descricao=${descricao}`)
    } 
}

export default new CategoriaDataService()