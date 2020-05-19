import http from "../http-common"

class ImagemDataService {
    cadastrarImagem(file) {
        return http.post("/membros/files", file)
    }

    buscarImagem(avatar_id) {
        return http.get(`/membros/files/${avatar_id}`)
    }

}

export default new ImagemDataService()