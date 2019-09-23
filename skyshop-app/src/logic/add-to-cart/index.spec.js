// import logic from '../'
// import data from 'skyshop-data'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// const  { database, models } = data
// const { User, Product } = models
// const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
// const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST
// describe.only('logic - add to cart', () => {
//     beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

//     let name, surname, email, password, userId
//     let title,image,description,size,color,price, productId
//     let quantity1,itemId
//     let date
    
//     beforeEach(async() => {

//         quantity1 = Number((Math.random()*1000).toFixed())
//         date= new Date()

//         await User.deleteMany()
//             name = `name-${Math.random()}`
//             surname = `surname-${Math.random()}`
//             email = `email-${Math.random()}@domain.com`
//             password = `password-${Math.random()}`
            
//             title = `title-${Math.random()}`
//             image = `image-${Math.random()}`
//             description = `description-${Math.random()}`
//             size =  's' 
//             color = `color-${Math.random()}`
//             price = Math.random()

//             const product=await Product.create({ title,image,description,size,color,price })
//             productId = product.id 
//             const user=await User.create({ name, surname, email, password })
//             userId = user.id

          
//     })

//     it('should succeed on correct data',async () =>{
//         debugger
//         await logic.addToCart(userId,productId,quantity1)
              
//         const user=await User.findById(userId)
//         expect(user).toBeDefined
//         expect(user.cart).toBeDefined
//         expect(user.cart[0].quantity).toBe(quantity1)

//     })
    
// })




