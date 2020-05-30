import http from "../http-common"

class DespesaDataService {
    buscarTodos(page) {
        return http.get(`/financeiro/despesas?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/financeiro/despesas/${id}`)
    }

    cadastrar(data) {
        return http.post("/financeiro/despesas", data)
    }

    editar(id, data) {
        return http.put(`/financeiro/despesas/${id}`, data)
    }

    buscarDescricao(descricao) {
        return http.get(`/financeiro/despesas?descricao=${descricao}`)
    } 
}

export default new DespesaDataService()