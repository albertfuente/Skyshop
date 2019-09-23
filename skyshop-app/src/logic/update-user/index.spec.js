import logic from '../'
import data from 'skyshop-data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const  { database, models } = data
const { User } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST
describe.only('logic - update user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    let name, surname, email, password, id, body

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        body = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        await User.deleteMany()
            const user=await User.create({ name, surname, email, password })
             id = user.id
             const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
            logic.__credentials__ = { id, token }
    })

    it('should succeed on correct data', async() =>{
        const result=await logic.updateUser(body)

            expect(result).toBeDefined()

            const user=await User.findById(id)

            expect(user).toBeDefined()
            expect(user.name).toBe(body.name)
            expect(user.surname).toBe(body.surname)
            expect(user.email).toBe(body.email)
            expect(user.extra).toBeUndefined()
             
    })

    it('should fail on non-existing user', async () => {
         const user=await User.create({ name, surname, email, password })
             id = user.id
             let token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
             id='5d5d5530531d455f75da9fF9'
             token='5d5d5530531d455f75da9fF9'
            logic.__credentials__ = { id, token }

        try{
            await logic.updateUser(body)
             throw new Error('should not reach this point') 

        }catch(error){
            expect(error.message).toBe(`jwt malformed`)
        }
    }) 
    
afterAll(() => database.disconnect())

})
