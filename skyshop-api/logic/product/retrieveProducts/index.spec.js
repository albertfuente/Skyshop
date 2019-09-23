require('dotenv').config() //nuevo
const retrieveProducts = require('.')
const { expect } = require('chai')
const { database,models:{User, Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - retrieve products', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo
    let userId
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
            let newProduct = new Product({ title,image,description,size,color, price })
            productId = newProduct.id
            await newProduct.save()
        })()
    })
    it('should succeed on correct data', async () => {
        const product = await retrieveProducts( title)
        expect(product).to.exist
        expect(product[0].title).to.equal(title)
        expect(product[0].image).to.deep.equal(image)
        expect(product[0].size).to.deep.equal(size)

    }
    )

    it('should fail if product does not exist', async () => {

        try {
            await retrieveProducts("xxx")
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Product with id ${title} does not exist.`)
        }
    })
    
    it('should fail on empty Product ID', () =>
        expect(() =>
            retrieveProducts( '')
        ).to.throw('query is empty or blank')
    )
    it('should fail on undefined Product ID', () =>
        expect(() =>
            retrieveProducts( undefined)
        ).to.throw(`query with value undefined is not a string`)
    )
    it('should fail on wrong data type for Product ID', () =>
        expect(() =>
            retrieveProducts( 123)
        ).to.throw(`query with value 123 is not a string`)
    )
})