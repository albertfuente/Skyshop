require('dotenv').config() 
const { expect } = require('chai')

const retrieveAllOrders = require('.')
const { database,models:{User, Product, Item, Order} } = require('skyshop-data')
const{env: {DB_URL_TEST}}=process 


describe('logic - retrieve all orders', () => {

    before(() => database.connect(DB_URL_TEST)) 
    
    let name, surname, email, password, userId, user, isAdmin
    let title,image,description,size,color,price, productId
    let quantity1,itemId
    let orderId, date
    

    beforeEach(async() => {

        quantity1 = Number((Math.random()*1000).toFixed())
        date= new Date()
        await Order.deleteMany()
        await User.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            isAdmin=true
            
            title = `title-${Math.random()}`
            image = `image-${Math.random()}`
            description = `description-${Math.random()}`
            size =  's' 
            color = `color-${Math.random()}`
            price = Math.random()

            const product=await Product.create({ title,image,description,size,color,price })
            productId = product.id.toString()
            
            const user=await User.create({ name, surname, email, password, isAdmin })
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
        
        const result=await retrieveAllOrders(userId)
        expect(result).to.exist
        expect(result[0].state).to.deep.equal(['opened'])
        expect(result[0].date).to.deep.equal(date)

    }) 

    it('should fail on wrong user',async () =>{
        userId:'15985d5fe532b4f3f827e6fc64f87104'
        try{
            await retrieveAllOrders(userId)
            
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('You have no admin rights')
        }
    }) 

    
    it('should fail on empty userId', () =>
    expect(() =>
        retrieveAllOrders('')
    ).to.throw('userId is empty or blank')
    )

    it('should fail on undefined userId', () =>
    expect(() =>
        retrieveAllOrders(undefined)
    ).to.throw(`userId with value undefined is not a string`)
    )

    it('should fail on wrong data type for userId', () =>
    expect(() =>
        retrieveAllOrders(123)
    ).to.throw(`userId with value 123 is not a string`)
    )


    after(() => database.disconnect())
})