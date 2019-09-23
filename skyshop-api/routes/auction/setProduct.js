const logic = require('../../logic')

module.exports = async(req, res)=> {
    

    const { params: { id,productId } } = req
debugger
    try {
        const auctionId=await logic.auction.setProduct(id,productId)
            res.status(201).json({ message: 'Auction registered successfully', auctionId})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}
