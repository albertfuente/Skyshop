require('dotenv').config() //nuevo
const update = require('.')
const { expect } = require('chai')
const {database, models:{ Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - update product', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo
    let  productId, body
    let title,image,description,size,color, price

    beforeEach(() => {
        
        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        description = `description-${Math.random()}`
        size = `l`
        color = `color-${Math.random()}`
        price = Math.random()

        body={
            title :`title`,
            image : `image`,
            description : `description`,
            size : `l`,
            color : `color`,
            price : 12
        }

        return (async () => {
            await Product.deleteMany()
            let newProduct =await new Product({ title,image,description,size,color, price })
            productId = newProduct.id
            await newProduct.save()
        })()
    })
    it('should succeed on correct data', async () => {
        await update(productId,body)
        
        const product=await Product.findById(productId)
        expect(product).to.exist
        expect(product.title).to.equal(body.title)
        expect(product.image).to.deep.equal(body.image)
        expect(product.size).to.deep.equal(body.size)

    }
    )

    it('should fail on empty Product ID', () =>
    expect(() =>
        update(productId,"")
    ).to.throw('fieldsToUpdate with value  is not an object')
)
it('should fail on empty Product ID', () =>
    expect(() =>
        update(productId,123)
    ).to.throw('fieldsToUpdate with value 123 is not an object')
)


    it('should fail on empty Product ID', () =>
        expect(() =>
            update('',body)
        ).to.throw('productId is empty or blank')
    )
    it('should fail on undefined Product ID', () =>
        expect(() =>
            update( undefined,body)
        ).to.throw(`productId with value undefined is not a string`)
    )
    it('should fail on wrong data type for Product ID', () =>
        expect(() =>
            update( 123,body)
        ).to.throw(`productId with value 123 is not a string`)
    )
})

