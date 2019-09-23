const { models:{Item} } = require('skyshop-data')
const {validate} = require('skyshop-utils')

/**
 * Unregisters an item.
 * 
 * @param {string} id
 * 
 * @throws {Error} - if product id does not exist.
 * 
 * 
 */

module.exports = function (id) {
    debugger
    validate.string(id, 'id')

    return(async()=>{
        const result=await Item.deleteOne({ _id: id })
            if (!result) throw new Error(`Product with id ${id} does not exist.`)
    })()

}