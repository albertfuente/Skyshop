const logic = require('../../logic')

module.exports = async (req, res) => {
    const { params: { productId }, body} = req
    try {
        const product = await logic.product.update(productId, body)
        res.json({ message: 'Product updated correctly', product })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
