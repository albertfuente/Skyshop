require('dotenv').config()
const {validate} = require('skyshop-utils')

const {models:{Product}}=require('skyshop-data')
const cloudinary = require('cloudinary')
const { env: { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } } = process
/**
* Update product information.
* 
* @param {String} productId 
* @param {Buffer} buffer 
* 
* @throws {TypeError} - if productId is not a string or buffer is not a buffer.
* @throws {Error} - if any param is empty, product is not found or image could not be uploaded.
*
* @returns {Object} - product.  
*/
module.exports = function (productId, image) {
    validate.string(productId, 'product id')
    //validate.object(image, 'image')
    return (async () => {
        const product = await Product.findById(productId)
        if (!product) throw new Error(`product with userId ${productId} not found`)
        cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY
            })
        
        const _image = await new Promise((resolve, reject) => {
            const upload_stream = cloudinary.v2.uploader.upload_stream((err,image) => {
                if (err) return reject (`Image could not be uploaded: ${err}`)
                resolve(image)
            })
            image.pipe(upload_stream)
        })
        product.image = _image.secure_url
        product.id = product._id.toString()
        delete product._img
        await product.save()
    })()
}