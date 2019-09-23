const logic = require('../../logic')

module.exports = async(req, res)=> {
    

    const { params: { userId,auctionId } } = req
debugger
    try {
        const auction=await logic.auction.insertDate(userId,auctionId)
            res.status(200).json({ message: 'Auction updated successfully', auction})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}
