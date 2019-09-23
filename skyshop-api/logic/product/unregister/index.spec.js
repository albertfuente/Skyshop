require('dotenv').config() //nuevo
const unregister = require('.')
const { expect } = require('chai')
const { database,models:{User, Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - delete product', () => {
    
    let title,image,description,size,color, price, id, productId

    before(() => database.connect(DB_URL_TEST)) //nuevo
    
    beforeEach(async() => {
                title = `title-${Math.random()}`
                image = `image-${Math.random()}`
                description = `description-${Math.random()}`
                size = `l`
                color = `color-${Math.random()}`
                price = Math.random()

        await Product.deleteMany()

                const product=await new Product({title,image,description,size,color, price})
                productId=product.id 
                return await product.save() //retornes l'usuari guardat
                     
    })

    it('should succeed on correct data',async () =>{        
        const productResult=await unregister(productId)   
                             
                expect(productResult).not.to.exist
            }        
    )

        it('should fail if there is no product',async () =>{
        let x= '5d5d5530531d455f75da9fF9'
        try{
            unregister( x)
        }catch(error){
            expect(error).to.exist
                expect(error.message).to.equal(`Product with id ${x} does not exist.`)
        }
    }) 

        it('should fail on empty Product ID', () =>
        expect(() =>
        unregister('')
        ).to.throw('productId is empty or blank')
    )
    it('should fail on undefined Product ID', () =>
        expect(() =>
        unregister( undefined)
        ).to.throw(`productId with value undefined is not a string`)
    )
    it('should fail on wrong data type for Product ID', () =>
        expect(() =>
        unregister( 123)
        ).to.throw(`productId with value 123 is not a string`)
    )
    after(() => database.disconnect())
})

