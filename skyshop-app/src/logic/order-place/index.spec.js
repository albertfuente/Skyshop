import logic from '../'
import data from 'skyshop-data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const  { database, models } = data
const { User, Product, Item } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST
describe.only('logic - place order', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))


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
            debugger
            const user=await User.create({ name, surname, email, password })
            id = user.id
             const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
            logic.__credentials__ = { id, token }
            userId=id
            
            let item = new Item({product:productId,quantity:quantity1})
            debugger
            user.cart.push(item)
            await user.save()
         
    })

     it('should succeed on correct data',async () =>{
        debugger
        const result=await logic.placeOrder(userId)
        orderId=result.id
        expect(result).toBeDefined()

        const order=await Order.findById(orderId)
        expect(order).toBeDefined()
        expect(order.date).toBeDefined()
        expect(order.owner.toString()).to.Be(userId)
    }) 


    
afterAll(() => database.disconnect())

})
