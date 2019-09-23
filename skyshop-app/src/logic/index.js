import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import isUserLoggedIn from './is-user-logged-in'
import registerProduct from './register-product'
import retrieveAllProducts from './retrieve-all-products'
import retrieveProduct from './retrieve-product'
import retrieveProductCategory from './retrieve-product-category'
import retrieveAllOrders from './orders-retrieve-all'
import updateUser from './update-user'
import removeUser from './remove-user'
import addToCart from './add-to-cart'
import retrieveAllOrdersUser from './orders-retrieve-user'
import updateCart from './update-cart'
import placeOrder from './order-place'
import uploadPhoto from './upload-picture'
import retrieveCart from './retrieve-cart'
import updateProduct from './update-product'
import removeProduct from './remove-product'
import updateAuction from './update-auction'
import setAuction from './set-auction'
import retrieveAuction from './retrieve-auction'
import retrieveAuctionProduct from './retrieve-auction-product'
import setDate from './auction-set-date'

export default {
    set __credentials__({ id, token }) {
        sessionStorage.id = id
        sessionStorage.token = token
    },
    get __credentials__() {
        const { id, token } = sessionStorage

        return { id, token }
    },
    registerUser,
    authenticateUser,
    retrieveUser,
    isUserLoggedIn,
    registerProduct,
    retrieveAllProducts,
    retrieveProduct,
    retrieveProductCategory,
    retrieveAllOrders,
    updateUser,
    removeUser,
    addToCart,
    retrieveAllOrdersUser,
    updateCart,
    placeOrder,
    uploadPhoto,
    retrieveCart,
    updateProduct,
    removeProduct,
    setAuction,
    updateAuction,
    retrieveAuction,
    retrieveAuctionProduct,
    setDate
}