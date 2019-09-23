const logic = require('../../logic')
module.exports = async (req, res) => {
    const { params: { productId } } = req
    try {
        const product = await logic.product.retrieve(productId)
        res.json({ message: 'Product retrieved correctly', product })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
