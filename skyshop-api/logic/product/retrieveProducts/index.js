const {validate} = require('skyshop-utils')
const { models:{Product} } = require('skyshop-data')

/**
 * Retrieves all products based on a query
 * 
 * @param {*} query 
 * 
 * @throws {Error} - if product does not exist.
 * 
 * @returns {Object}
 * 
*/

module.exports = function ( query) {
    validate.string(query, 'query')
    return (async () => {
     
        const product = await Product.find({title:query},{ password: 0,__v: 0 })
        if (!product) throw Error(`Product with title ${title} does not exist.`)
        return product
    })()
}