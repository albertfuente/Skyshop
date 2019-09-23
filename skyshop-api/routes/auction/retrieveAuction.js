const logic = require('../../logic')
module.exports = async (req, res) => {
    const { params: { auctionId } } = req
    try {
        const auction = await logic.auction.retrieveAuction(auctionId)
        res.json({ message: 'Auction retrieved correctly', auction })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
