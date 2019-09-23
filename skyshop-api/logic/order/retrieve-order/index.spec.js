require('dotenv').config() 
const { expect } = require('chai')

const retrieveOrder = require('.')
const { database,models:{User, Product, Item, Order} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process 


describe('logic - retrieve order', () => {

    before(() => database.connect(DB_URL_TEST)) 
    
    let name, surname, email, password, userId, user
    let title,image,description,size,color,price, productId
    let quantity1,itemId
    let orderId, date
    

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
            productId = product.id.toString()
            
            const user=await User.create({ name, surname, email, password })
            userId = user.id
            
            let item = new Item({product:productId,quantity:quantity1})
            debugger
            user.cart.push(item)
            await user.save()

            let order=new Order({date:date, state:'opened', owner:userId,items:user.cart})
            orderId=order.id
            order.items.push(user.cart.items)
            await order.save()
            
    })

        it('should succeed on correct data',async () =>{
        
        debugger
        const result=await retrieveOrder(userId,orderId)
        expect(result).to.exist
        expect(result[0].owner.toString()).to.equal(userId)
        expect(result[0].state).to.deep.equal(['opened'])
        expect(result[0].date).to.deep.equal(date)

        
      /*   expect(order.date).to.exist
        expect(order.owner.toString()).to.equal(userId) */
    }) 

    it('should fail on wrong user',async () =>{
        userId:'15985d5fe532b4f3f827e6fc64f87104'
        try{
            await retrieveOrder(userId,orderId)
            
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('User does not exist')
        }
    }) 

    
it('should fail on empty userId', () =>
expect(() =>
    retrieveOrder('',orderId)
).to.throw('userId is empty or blank')
)

it('should fail on undefined userId', () =>
expect(() =>
    retrieveOrder(undefined, orderId)
).to.throw(`userId with value undefined is not a string`)
)

it('should fail on wrong data type for userId', () =>
expect(() =>
    retrieveOrder(123, orderId)
).to.throw(`userId with value 123 is not a string`)
)

it('should fail on empty orderId', () =>
expect(() =>
    retrieveOrder(userId,'')
).to.throw('orderId is empty or blank')
)

it('should fail on undefined orderId', () =>
expect(() =>
    retrieveOrder(userId,undefined)
).to.throw(`orderId with value undefined is not a string`)
)

it('should fail on wrong data type for orderId', () =>
expect(() =>
    retrieveOrder(userId,123)
).to.throw(`orderId with value 123 is not a string`)
)


    after(() => database.disconnect())
})