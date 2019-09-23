const logic = require('../../logic')

module.exports = async(req, res)=> {

    const { body: { title,image,description,size,color,price } } = req

    try {
        const productId=await logic.product.register(title,image,description,size,color, price)
            res.status(201).json({ message: 'Product registered successfully', id: productId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}
