const {validate} = require('skyshop-utils')
const { models:{Auction} } = require('skyshop-data')

/**
 * Retrieves an auction based on productId
 *  
 * @param {*} productId 
 * 
 * @throws {Error} - if product Id does not exist.
 * @throws {Error} - if there are no auctions.
 * 
 * 
 * @returns {Object}
 * 
*/

module.exports = function ( productId) {
    validate.string(productId, 'Product ID')
    return (async () => {
        const allAuctions=await Auction.find({})
        if (!allAuctions) throw Error(`There are no auctions.`)
        let result=false
        result=allAuctions.find(({product})=> {
            return product.toString()===productId
        })
        if(result){return result}else{return false}

    })()
}