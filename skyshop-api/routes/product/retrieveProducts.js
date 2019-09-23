const logic = require('../../logic')
module.exports = async function (req, res) {
    const { params: { title } } = req
    
    try {
        const product = await logic.product.retrieveProducts(title)
        res.json({ message: 'Products retrieved correctly', product })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
