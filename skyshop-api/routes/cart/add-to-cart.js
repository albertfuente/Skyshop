const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { body:{productId,quantity}, params: { id } } = req

    try { 
        debugger

        await logic.cart.addToCart(id,productId,quantity)
            .then((orderId) => res.status(201).json({ message: 'Order registered successfully',orderId}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}