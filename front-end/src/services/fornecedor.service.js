import http from "../http-common"

class FornecedorDataService {
    buscarTodos() {
        return http.get("/financeiro/fornecedores")
    }

    buscarUm(id) {
        return http.get(`/financeiro/fornecedores/${id}`)
    }

    cadastrar(data) {
        return http.post("/financeiro/fornecedores", data)
    }

    editar(id, data) {
        return http.put(`/financeiro/fornecedores/${id}`, data)
    }

    buscarDescricao(descricao) {
        return http.get(`/financeiro/fornecedores?descricao=${descricao}`)
    } 
}

export default new FornecedorDataService()