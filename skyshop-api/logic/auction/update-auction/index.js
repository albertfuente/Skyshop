const {validate} = require('skyshop-utils')
const {models:{Auction, User}}=require('skyshop-data')

/**
 * Updates the auction with price
 * 
 * @param {*} auctionId
 * @param {*} userId
 * @param {*} price
 * 
 * @throws {Error} - if user id does not exist.
 * @throws {Error} - no price is provided.
 * 
 */

 module.exports=function(userId, auctionId,price){
    //todo validate.string(auctionId, 'productId')
    
    return (async ()=>{
    const user=await User.findOne({_id:userId})
    
    if (!user) throw Error(`User with id ${userId} does not exist.`)

    if(!price)throw Error('No field to update price provided')
    
    const auction=await Auction.findOne({_id:auctionId})
    auction.price = price
    auction.owner = userId    
    auction.save()


    })()
    

 }