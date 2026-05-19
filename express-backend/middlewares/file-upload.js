const multer = require('multer')
const nanoid = require('../util/nanoid')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

const fileUpload = multer({
    limits: 500_000,
    storage: multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,'uploads/images')
        },
        filename: (req,file,cb) => {
            const extension = MIME_TYPE_MAP[file.mimetype]
            const fileId = nanoid()
            cb(null,`upload-${fileId}.${extension}`)
        }
    }),
    fileFilter: (req,file,cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]
        const error = isValid ? null : new Error('Invalid mime type!')
        cb(error,isValid)
    }
})

module.exports = fileUpload