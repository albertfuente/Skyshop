const { models: { User, Item } } = require('skyshop-data')
const { validate } = require('skyshop-utils')

/**
 * Adds to user the cart
 * 
 * @param {*} userId 
 * @param {*} productId 
 * @param {*} quantity 
 * 
 * @throws {Error} - if user id does not exist.
 * 
 * 
 */

module.exports = function(userId, productId, quantity) {
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')
    validate.number(quantity, 'quantity')

    return (async () => {
        const user = await User.findById(userId)
        

        if (!user) throw Error(`User with id ${userId} does not exist`)

        let item = user.cart.find(item => item.product.toString() === productId)
        
        if (item) item.quantity += quantity

        else {
            item = new Item({product: productId, quantity})
            user.cart.push(item)
        }
        await user.save()
        const user1 = await User.findById(userId)
        let item1 = user1.cart.find(item => item.product.toString() === productId)
        if(item1.quantity<0) item1.quantity=0

        await user1.save()

    })()
}

