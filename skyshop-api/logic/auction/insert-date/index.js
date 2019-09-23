const {validate} = require('skyshop-utils')
const {models:{Auction, User}}=require('skyshop-data')

/**
 * Inserts a second date 
 * 
 * @param {*} auctionId
 * @param {*} userId
 * 
 * @throws {Error} - if userId does not exist.
 *  
 * 
 */

 module.exports=function(userId, auctionId){
    validate.string(auctionId,'auctionId')
    validate.string(userId,'userId')
    
    return (async ()=>{
    const user=await User.findOne({_id:userId})
    
    if (!user) throw Error(`User with id ${userId} does not exist.`)
    const auction=await Auction.findOne({_id:auctionId})
    const date=await new Date()
    auction.date2 = date    
    auction.save()

    })()
    

 }