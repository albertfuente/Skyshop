require('dotenv').config() //nuevo
const retrieve = require('.')
const { expect } = require('chai')
const {database, models:{User, Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - retrieve product', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo
    let  productId
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
        const product = await retrieve( productId)
        expect(product).to.exist
        expect(product.title).to.equal(title)
        expect(product.image).to.deep.equal(image)
        expect(product.size).to.deep.equal(size)

    }
    )
    it('should throw an error with a wrong id',async () =>{
        try{
            await retrieve("5d5fe532b4f3f827e6fc64f8")

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`Product with id 5d5fe532b4f3f827e6fc64f8 does not exist.`)

        }
    })

    it('should fail on empty Product ID', () =>
        expect(() =>
            retrieve('')
        ).to.throw('Product ID is empty or blank')
    )
    it('should fail on undefined Product ID', () =>
        expect(() =>
            retrieve( undefined)
        ).to.throw(`Product ID with value undefined is not a string`)
    )
    it('should fail on wrong data type for Product ID', () =>
        expect(() =>
            retrieve( 123)
        ).to.throw(`Product ID with value 123 is not a string`)
    )
})