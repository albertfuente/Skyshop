const logic = require('../../logic')

module.exports = async(req, res)=> {

    const {params: { id ,  orderId} } = req

    try {
        debugger

        await logic.order.retrieveOrder(id,orderId)
            .then((orderId) => res.status(201).json({ message: 'Order retrieved successfully',orderId}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}