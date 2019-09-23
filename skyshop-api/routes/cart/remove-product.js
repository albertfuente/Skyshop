const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { body:{productId}, params: { id } } = req

    try { 
        debugger

        await logic.cart.removeProduct(id,productId)
            .then((orderId) => res.status(201).json({ message: 'Item unregistered successfully',orderId}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}