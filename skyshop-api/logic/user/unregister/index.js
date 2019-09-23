const { models:{User} } = require('skyshop-data')
const {validate} = require('skyshop-utils')
const bcrypt = require('bcryptjs')

/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @throws {Error} - if user does not exists.
 * @throws {Error} - if password does not match.
 * 
 */
module.exports = function (id, password) {
    validate.string(password, 'password')
    validate.string(id, 'id')

    return(async()=>{
        const user=await User.findById(id)
            if (!user) throw Error('Wrong credentials.')
            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')

        const result=await User.deleteOne({ _id: id })
            if (!result.deletedCount) throw new Error(`wrong credentials`)

    })()

}