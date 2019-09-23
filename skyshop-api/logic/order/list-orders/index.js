const { models: { Product, User, Order, Item } } = require('skyshop-data')
const { validate } = require('skyshop-utils')

/**
 * Retrieve all orders from a user
 * 
 * @param {*} userId 
 * 
 * @throws {Error} - if user id does not exist.
 * @throws {Error} - order does not exist.
 * @throws {Error} - if there are no orders for the user id.
 * 
 * @returns {Object}
 */

module.exports = function(userId) {
    validate.string(userId, 'userId')

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw Error(`User with id ${userId} does not exist`)
        const orders = await Order.find({ owner: userId}, { __v: 0 }).populate('items.product').sort({ _id: 1 }).lean()
        if(!orders) throw new Error(`Order with id ${orderId} not exist`)
        
        orders.forEach(order => {
            order.id = order._id.toString()
            delete order._id
        })
        if( orders.length === 0 ) {
            throw new Error(`User with id ${userId} do not have any orders`)
        } else {
            return orders
        }
    })()

}

