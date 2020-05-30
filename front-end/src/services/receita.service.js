import http from "../http-common"

class ReceitaDataService {
    buscarTodos(page) {
        return http.get(`/financeiro/receitas?page=${page}`)
    }

    buscarUm(id) {
        return http.get(`/financeiro/receitas/${id}`)
    }

    cadastrar(data) {
        return http.post("/financeiro/receitas", data)
    }

    editar(id, data) {
        return http.put(`/financeiro/receitas/${id}`, data)
    }

    buscardescricao(descricao) {
        return http.get(`/financeiro/receitas?descricao=${descricao}`)
    } 
}

export default new ReceitaDataService()