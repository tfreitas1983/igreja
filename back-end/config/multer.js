import multer from 'multer'
import crypto from 'crypto'
import { extname, resolve } from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve('..', 'front-end', 'src', 'images'),
        filename: (req, file, cb) => {
            crypto.randomBytes (16, (err, res) => {
                if (err) return cb(err)

                return cb (null, res.toString('hex') + extname(file.originalname))
            })
        },
    }),
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const allowMimes = [
            'image/pjeg',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/tiff',
            'image/gif',
            'image/svg']
        if(allowMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Extensão inválida'))
        }
    },
}

