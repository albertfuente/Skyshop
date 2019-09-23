require('dotenv').config() //nuevo
const register = require('.')
const { expect } = require('chai')
const { database,models:{User, Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo


describe('logic - register product', () => {

    before(() => database.connect(DB_URL_TEST)) //nuevo

    let title,image,description,size,color, price, productId

    beforeEach(async() => {

        title = `title-${Math.random()}`
        image = `image-${Math.random()}`
        description = `description-${Math.random()}`
        size = "s"
        color = `color-${Math.random()}`
        price = Math.random()

        await Product.deleteMany() 
    })

    it('should succeed on correct data', async() =>{
        
        let result= await register(title,image,description,size,color,price)
                
                productId = result
                expect(productId).to.exist
                
                const product=await Product.findOne({ _id:productId })
                
          
                expect(product).to.exist
                expect(product.title).to.equal(title)
                expect(product.image).to.equal(image)
                expect(product.description).to.equal(description)
                 expect(product.size).to.equal(size)
                expect(product.color).to.equal(color)
                expect(product.price).to.equal(price)
        }       
    )

    it('should fail on empty title', () =>
    expect(() =>
        register('',image,description,size,color,price)
    ).to.throw('title is empty or blank')
    )
    it('should fail on undefined title', () =>
        expect(() =>
            register(undefined,image,description,size,color,price)
        ).to.throw(`title with value undefined is not a string`)
    )

    it('should fail on empty image', () =>
    expect(() =>
        register(title,'',description,size,color,price)
    ).to.throw('image is empty or blank')
    )
    it('should fail on undefined image', () =>
        expect(() =>
            register(title,undefined,description,size,color,price)
        ).to.throw(`image with value undefined is not a string`)
    )

    it('should fail on empty description', () =>
    expect(() =>
        register(title,image,'',size,color,price)
    ).to.throw('description is empty or blank')
    )
    it('should fail on undefined description', () =>
        expect(() =>
            register(title,image,undefined,size,color,price)
        ).to.throw(`description with value undefined is not a string`)
    )

    it('should fail on empty color', () =>
    expect(() =>
        register(title,image,description,size,'',price)
    ).to.throw('color is empty or blank')
    )
    it('should fail on undefined color', () =>
        expect(() =>
            register(title,image,description,size,undefined,price)
        ).to.throw(`color with value undefined is not a string`)
    )

    it('should fail on undefined price', () =>
        expect(() =>
            register(title,image,description,size,color,undefined)
        ).to.throw(`price with value undefined is not a number`)
    )

    it('should fail on wrong size', () =>
    expect(() =>
        register(title,image,description,'',color,price)
    ).to.throw(`size is empty or blank`)
    )
    it('should fail on undefined size', () =>
    expect(() =>
        register(title,image,description,undefined,color,price)
    ).to.throw(`size with value undefined is not a string`)
    )
    it('should fail on wrong size', () =>
    expect(() =>
        register(title,image,description,124,color,price)
    ).to.throw(`size with value 124 is not a string`)
    )
  
    after(() => database.disconnect())
})

