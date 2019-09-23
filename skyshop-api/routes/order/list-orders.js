const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { params: { id } } = req

    try {
        debugger

        await logic.order.listOrders(id)
            .then((orderId) => res.status(201).json({ message: 'Orders listed successfully',orderId}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}