/* 
const logic = require('../../logic')
const Busboy = require('busboy')
module.exports = (req, res) => {
    const { params: { productId }} = req 
    try {
        const busboy = new Busboy({ headers: req.headers })
        busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
            await logic.uploadPhoto(productId, file)
            res.json({ message: 'User image successfully uploaded.' })
        })()
        req.pipe(busboy) 
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
    
}  */


const logic = require('../../logic')
const Busboy = require('busboy')
module.exports = (req, res) => {
    const { params: { productId } } = req
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) =>
        logic.product.updatePhoto(productId, file)
            .then(()  => res.json({ message: 'Deployment image successfully uploaded.'}))
    )
    //busboy.on('finish', () => )
    req.pipe(busboy)
}