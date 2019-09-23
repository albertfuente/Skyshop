const {validate} = require('skyshop-utils')
const { models:{User} } = require('skyshop-data')
const bcrypt = require('bcryptjs')

/**
 * Updates one user
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
 * @throws {Error} - if no fields to Update are provided.
 * @throws {Error} - if id does not exist.
 * 
* 
*/

module.exports = function(id, fieldsToUpdate) {
    validate.string(id, 'id')
    validate.object(fieldsToUpdate,'fieldsToUpdate')

    if(!fieldsToUpdate)throw Error('No field to update provided')
    return(async()=>{

        if(fieldsToUpdate.password){
            const hash = await bcrypt.hash(fieldsToUpdate.password, 10)
            
            fieldsToUpdate.password = hash
            
            const user = await User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
            if (!user) throw new Error(`user with id ${id} does not exist`)
            }
        

    })()

}
