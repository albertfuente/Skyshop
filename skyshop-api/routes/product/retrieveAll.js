const logic = require('../../logic')
module.exports = async (req, res) => {
    try {
        const products = await logic.product.retrieveAll()
        res.json({ message: 'Products retrieved correctly', products })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
