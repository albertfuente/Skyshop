require('dotenv').config() //nuevo
const retrieveAll = require('.')
const { expect } = require('chai')
const {database, models:{User, Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - retrieve ALL products', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo
    let title,image,description,size,color, price

    beforeEach(() => {
        
        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        description = `description-${Math.random()}`
        size = `l`
        color = `color-${Math.random()}`
        price = Math.random()
        

        return (async () => {
            await Product.deleteMany()
            let newProduct =await new Product({ title,image,description,size,color, price })
            productId = newProduct.id
            await newProduct.save()
        })()
    })
    it('should succeed on correct data', async () => {
        const product = await retrieveAll()
        expect(product).to.exist
        
        expect(product[0].title).to.equal(title)
        expect(product[0].image).to.deep.equal(image)
        expect(product[0].size).to.deep.equal(size)        

    })
 
    it('should fail if product does not exist', async () => {
        try {
            await retrieveAll()
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Productsdoes not exist.`)
        }
    })
    
})