const logic = require('../../logic')

module.exports = async(req, res)=> {

    const {  params: { id } } = req

    try { 
        debugger

        await logic.cart.listCart(id)
            .then((cart) => res.status(201).json({ message: 'Cart retrieved successfully',cart}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}