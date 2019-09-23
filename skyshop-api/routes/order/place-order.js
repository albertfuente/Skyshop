const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { body:{productId,quantity}, params: { id } } = req

    try {
        

        await logic.order.placeOrder(id,productId,quantity)
            .then((orderId) => res.status(201).json({ message: 'Order placed registered successfully',orderId}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}