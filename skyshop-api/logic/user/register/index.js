const {validate} = require('skyshop-utils')
const { models:{User} } = require('skyshop-data') 
const bcrypt = require('bcryptjs')


/**
 * Registers a new user
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 * @param {*} isAdmin
 * 
 * @throws {Error} - if email already exists.
 * 
 * @returns {Object} - user
 */

module.exports = function(name, surname, email, password,isAdmin) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    return(async()=>{
        const user= await User.findOne({ email })

            if (user) throw Error(`user with e-mail ${email} already exists`)
            
            const hash=await bcrypt.hash(password,10)

            await User.create({name, surname, email, password: hash,isAdmin})
            return user
    })()
    

}




