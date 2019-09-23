// import logic from '../'
// import data from 'skyshop-data'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// const  { database, models } = data
// const { Product } = models
// const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
// const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST
// describe.only('logic - register product', () => {
//     beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
//     let title,image,description,size,color, price, productId

//     beforeEach(async() => {

//         title = `title-${Math.random()}`
//         image={name:`image-${Math.random()}`} 
//         const{name}=image
//         description = `description-${Math.random()}`
//         size = "s"
//         color = `color-${Math.random()}`
//         price = Math.random()

//         await Product.deleteMany() 
//         id = user.id
//              const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
//             logic.__credentials__ = { id, token }
//     })

//     it('should succeed on correct data', async() =>{
        
//         let result= await logic.registerProduct(title,{name},description,size,color,price)
                
//                 productId = result
//                 expect(productId).toBeDefined()
                
//                 const product=await Product.findOne({ _id:productId })
                
          
//                 expect(product).toBeDefined()
//                 expect(product.title).toBe(title)
//                 expect(product.image).toBe(image)
//                 expect(product.description).toBe(description)
//                  expect(product.size).toBe(size)
//                 expect(product.color).toBe(color)
//                 expect(product.price).toBe(price)
//         }       
//     )
    
// afterAll(() => database.disconnect())

// })
