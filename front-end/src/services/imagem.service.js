import http from "../http-common"

class ImagemDataService {
    cadastrarImagem(data) {
        return http.post("/membros/files", data)
    }

    buscarImagem(avatar_id) {
        return http.get(`/membros/files/${avatar_id}`)
    }

}

export default new ImagemDataService()