const {validate} = require('skyshop-utils')
const {models:{Product}}=require('skyshop-data')

/**
 * Updates a product
 * 
 * @param {*} productId
 * @param {*} fieldsToUpdate
 * 
 * @returns {Promise}
 */

 module.exports=function(productId,fieldsToUpdate){
    validate.string(productId, 'productId')
    validate.object(fieldsToUpdate,'fieldsToUpdate')

    if(!fieldsToUpdate)throw Error('No field to update provided')
    return(async()=>{
        const user=await Product.findByIdAndUpdate(productId, { $set: fieldsToUpdate })
             if (!user) throw Error(`User with id ${id} does not exist.`)

    })()

 }