require('dotenv').config() //nuevo
const { expect } = require('chai')

const listCart = require('.')
const { database,models:{User, Product, Cart, Item} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process //nuevo


describe('logic - list cart', () => {

    before(() => database.connect(DB_URL_TEST)) //nuevo
    
    let name, surname, email, password, userId, user
    let title,image,description,size,color,price, productId
    let quantity1, itemId
    
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
            
            user=await User.create({ name, surname, email, password })
            userId = user.id

            let item = new Item({product:productId,quantity:quantity1})
            
            user.cart.push(item)
            await user.save()
                  
    })

    it('should succeed on correct data',async () =>{
  

        await listCart(userId)
        const user=await User.findById(userId)
        debugger
        expect(user.cart[0]).to.exist
        expect(user.cart[0].quantity).to.equal(quantity1)
        expect(user.cart[0].product).to.exist

    })

 it('should fail on empty userId', () =>
 expect(() =>
     listCart('')
 ).to.throw('userId is empty or blank')
)
it('should fail on undefined userId', () =>
 expect(() =>
    listCart(undefined)
 ).to.throw(`userId with value undefined is not a string`)
)
it('should fail on wrong data type for userId', () =>
 expect(() =>
    listCart(123)
 ).to.throw(`userId with value 123 is not a string`)
)

    after(() => database.disconnect())
})