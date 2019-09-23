const logic = require('../../logic')

module.exports = async(req, res) => {

    const { params: { productId } } = req

    try {
        await logic.item.unregister(productId)
            .then(() => res.json({ message: 'Item unregistered successfully'}))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
