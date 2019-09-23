const mongoose = require('mongoose')
const { user, product, order,item,auction} = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Product: mongoose.model('Product',product),
    Order: mongoose.model('Order',order),
    Item: mongoose.model('Item',item),
    Auction: mongoose.model('Auction',auction)
}