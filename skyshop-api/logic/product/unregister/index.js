const {validate} = require('skyshop-utils')
const { models:{Product} } = require('skyshop-data')

/**
 * Unregisters a product by its id
 * 
 * @param {string} productId
 * 
 * @throws {Error} - if product with id provided does not exist.
 * 
*/


module.exports = function(productId) { 
    validate.string(productId, 'productId')
    return(async()=>{

            const product = await Product.deleteOne({_id:productId})
            if (!product) throw Error(`Product with id ${productId} does not exist.`)

    })()
}


