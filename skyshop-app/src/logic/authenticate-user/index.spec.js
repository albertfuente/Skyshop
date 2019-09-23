import logic from '../'
import data from 'skyshop-data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const  { database, models } = data
const { User } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST
describe.only('logic - authenticate user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))


    let name, surname, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user=await User.create({ name, surname, email, password: await bcrypt.hash (password, 10) })
        id = user.id
        const token=jwt.sign({sub:id},REACT_APP_JWT_SECRET_TEST)
        logic.__credentials__={id,token}
    })

    it('should succeed on correct data',async () =>{
        debugger
        const _id=await logic.authenticateUser(email, password)
        
            expect(_id).toBeUndefined()
      
       
    })
    it('should fail on incorrect mail',async () => {
        try{
            await logic.authenticateUser("pepito@mail.com", password)

        }catch(error){
            expect(error).toBeDefined()
            expect(error.message).toBe('Wrong credentials.')
        }
    } )

    it('should fail on wrong password',async () =>{
        try{
            await logic.authenticateUser(email, "123")

        }catch(error){
            expect(error).toBeDefined()
            expect(error.message).toBe('wrong credentials')
        }
    }) 

    
afterAll(() => database.disconnect())

})
