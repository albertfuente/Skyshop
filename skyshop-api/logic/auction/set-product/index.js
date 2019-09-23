const { models: { User, Product, Auction } } = require('skyshop-data')
const { validate } = require('skyshop-utils')

/**
 * Sets an auction
 * 
 * @param {*} userId 
 * @param {*} productId 
 * 
 * @throws {Error} - if user id does not exist.
 * @throws {Error} - if product id does not exist.
 * 
 * @returns {Object}
 */

module.exports = function(userId, productId) {
    validate.string(userId,'userId')
    validate.string(productId,'productId')
   

    return (async () => {
        
        const user = await User.findById(userId)
        
        if (!user) throw Error(`User with id ${userId} does not exist`)

        const product = await Product.findOne({_id:productId})
        if (!product) throw Error(`Product with id ${productId} does not exist.`)
        
        else {
            const date=await new Date()
            
            
            const auction = await  Auction.create({product:productId,title:product.title, image:product.image,
                description:product.description,size:product.size,color:product.color,price:product.price,
                date: date, owner:userId})
            
            return auction._id
        }

    })()
}

