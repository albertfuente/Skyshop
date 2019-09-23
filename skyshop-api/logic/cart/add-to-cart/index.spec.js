require('dotenv').config() //nuevo
const { expect } = require('chai')

const addToCart = require('.')
const { database,models:{User, Product, Cart} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo


describe('logic - add to cart', () => {

    before(() => database.connect(DB_URL_TEST)) //nuevo
    
    let name, surname, email, password, userId
    let title,image,description,size,color,price, productId
    let quantity1,itemId
    let date
    

    beforeEach(async() => {

        quantity1 = Number((Math.random()*1000).toFixed())
        date= new Date()

        await User.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            
            title = `title-${Math.random()}`
            image = `image-${Math.random()}`
            description = `description-${Math.random()}`
            size =  's' 
            color = `color-${Math.random()}`
            price = Math.random()

            const product=await Product.create({ title,image,description,size,color,price })
            productId = product.id 
            debugger
            const user=await User.create({ name, surname, email, password })
            userId = user.id
            debugger

          
    })

    it('should succeed on correct data',async () =>{
        debugger
        await addToCart(userId,productId,quantity1)
              
        const user=await User.findById(userId)
        expect(user).to.exist
        expect(user.cart).to.exist
        expect(user.cart[0].quantity).to.equal(quantity1)
        /* expect(user.cart[0].product).to.equal(productId) */

    })
/* 
    it('should fail if the item already exists',async () =>{
        const item = new Item({ quantity })
        item.product=id
        await item.save()
        try{
            await addToCart(id, quantity)
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Item already exists.')
        }
    })

    it('should fail on empty id', () => 
        expect(() => 
               register("", quantity)
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               register(undefined, quantity)
    ).to.throw(`id with value undefined is not a string`)
    )

  */

 it('should fail on empty userId', () =>
 expect(() =>
     addToCart('',productId,quantity1)
 ).to.throw('userId is empty or blank')
)
it('should fail on undefined userId', () =>
 expect(() =>
    addToCart(undefined,productId,quantity1)
 ).to.throw(`userId with value undefined is not a string`)
)
it('should fail on wrong data type for userId', () =>
 expect(() =>
    addToCart(123,productId,quantity1)
 ).to.throw(`userId with value 123 is not a string`)
)

it('should fail on empty productId', () =>
expect(() =>
    addToCart(userId,'',quantity1)
).to.throw('productId is empty or blank')
)
it('should fail on undefined productId', () =>
expect(() =>
   addToCart(userId,undefined,quantity1)
).to.throw(`productId with value undefined is not a string`)
)
it('should fail on wrong data type for productId', () =>
expect(() =>
   addToCart(userId,123,quantity1)
).to.throw(`productId with value 123 is not a string`)
)

it('should fail on wrong data type for quantity1', () =>
expect(() =>
   addToCart(userId,productId,'123')
).to.throw(`quantity with value 123 is not a number`)
)

it('should fail on wrong data type for quantity1', () =>
expect(() =>
   addToCart(userId,productId,'')
).to.throw(`quantity with value  is not a number`)
)

    after(() => database.disconnect())
})