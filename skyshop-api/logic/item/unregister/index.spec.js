require('dotenv').config() //nuevo
const { expect } = require('chai')

const unregister = require('.')
const { database, models:{Item, Product} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - unregister item', () => {

    before(() => database.connect(DB_URL_TEST)) //nuevo

    let id, itemId

    beforeEach(async() => {

        quantity = Number((Math.random()*1000).toFixed())

        await Item.deleteMany()
            
            title = `title-${Math.random()}`
            image = `image-${Math.random()}`
            description = `description-${Math.random()}`
            size =  's' 
            color = `color-${Math.random()}`
            price = Math.random()

            const product=await Product.create({ title,image,description,size,color,price })
            id = product._id.toString()   
    })

    it('should succeed on correct data',async () =>{
        const result= await unregister(id)
        debugger
        
                expect(result).not.to.exist
    })

    it('should fail on empty id', () => 
        expect(() => 
               unregister("")
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               unregister(undefined)
    ).to.throw(`id with value undefined is not a string`)
    )

 

    after(() => database.disconnect())
}) 