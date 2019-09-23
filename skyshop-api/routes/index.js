const { Router } = require('express')
const tokenMiddleware = require('../helpers/token-middleware')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, retrieveUser, updateUser, unregisterUser } = require('./user')

const {registerProduct, retrieveProduct, unregisterProduct, retrieveAll, retrieveProducts, updateProduct, uploadPhoto}=require('./product')

const{placeOrder,listOrders, retrieveOrder, retrieveAllOrders}=require('./order')

const {addToCart, removeProduct, listCart}= require('./cart')

const{setProduct, retrieveAuction, updateAuction, retrieveAuctionProduct, insertDate}=require('./auction')

const router = Router()
const jsonBodyParser = bodyParser.json()

/* USER */
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch ('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete ('/users/:id/delete', [tokenMiddleware, jsonBodyParser], unregisterUser)

//PRODUCT
router.post('/products',jsonBodyParser,registerProduct)
router.get('/product/one/:productId',jsonBodyParser,retrieveProduct)
router.delete('/products/:productId',jsonBodyParser,unregisterProduct)
router.get('/products',jsonBodyParser,retrieveAll)
router.get('/product/q/:title',jsonBodyParser,retrieveProducts)
router.patch('/products/:productId',jsonBodyParser,updateProduct)
router.post('/products/:productId/photo',uploadPhoto)

//ORDER
router.post('/users/:id/orders',[tokenMiddleware, jsonBodyParser],placeOrder)
router.get('/users/:id/orders', [tokenMiddleware, jsonBodyParser], listOrders)
router.get('/users/:id/order/:orderId', [tokenMiddleware, jsonBodyParser], retrieveOrder)
router.get('/users/:id/allorders/', [tokenMiddleware, jsonBodyParser], retrieveAllOrders)

//CART
router.post('/users/:id/cart',[tokenMiddleware, jsonBodyParser],addToCart)
router.patch('/users/:id/cart/deleteItem',[tokenMiddleware, jsonBodyParser],removeProduct)
router.get('/users/:id/cart/',[tokenMiddleware, jsonBodyParser],listCart)

//AUCTION
router.post('/auction/:id/product/:productId',[tokenMiddleware, jsonBodyParser],setProduct)
router.get('/auction/one/:auctionId',jsonBodyParser,retrieveAuction)
router.patch('/auction/:userId/:auctionId',jsonBodyParser,updateAuction)
router.get('/auction/product/:productId',jsonBodyParser,retrieveAuctionProduct)
router.patch('/auction/product/:userId/:auctionId',jsonBodyParser,insertDate)









module.exports = router