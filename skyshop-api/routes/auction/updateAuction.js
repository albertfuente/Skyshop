const logic = require('../../logic')

module.exports = async (req, res) => {
    debugger
    const { params: { userId,auctionId }, body:{price}} = req
    try {
        const auction = await logic.auction.updateAuction(userId, auctionId,price)
        res.json({ message: 'Auction updated correctly', auction })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}
