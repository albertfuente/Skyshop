const logic = require('../../logic')
module.exports = async (req, res) => {
    const { params: { productId } } = req
    try {
        const auction = await logic.auction.retrieveAuctionProduct(productId)
        res.json({ message: 'Auctions retrieved correctly', auction })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
