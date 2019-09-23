import logic from '../'
import data from 'skyshop-data'
//import validate from 'skyshop-utils'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const  { database, models } = data
const { User } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST
describe.only('logic - retrieve user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, id, token
    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user=await User.create({ name, surname, email, password })
        id = user._id
        
        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)
        logic.__credentials__ = { id, token }
        

    })

    it('should succeed on correct data', async() =>{
        const user = await logic.retrieveUser()
        
            expect(user.user).toBedefined
            //expect(user.id).toBe(id)
            expect(user.user.id).toBeDefined()
            expect(user.user.name).toBe(name)
            expect(user.user.surname).toBe(surname)
            expect(user.user.email).toBe(email)
            expect(user.user.password).toBeUndefined()
  
    })
    it('should throw an error with a wrong id',async () =>{
        try{
            await logic.retrieveUser()

        }catch(error){
            
            expect(error).toBedefined
            expect(error.message).toBe(`User with id 5d5fe532b4f3f827e6fc64f8 does not exist.`)

        }
    })

    it('should fail on empty id', () =>{
        logic.__credentials__ = { id:"", token }
        expect(() =>
            logic.retrieveUser( "")
        ).toThrow('id is empty or blank')
    }
    
    )
//     it('should fail on undefined id', () =>{
//         logic.__credentials__ = { id:undefined, token }
//         expect(() =>
//         logic.retrieveUser( )
//         ).toThrow(`id with value undefined is not a string`)
//     }
//    )
//     it('should fail on wrong id', () =>{
//     logic.__credentials__ = { id:123, token }

//     expect(() =>
//         logic.retrieveUser( 123)
//     ).toThrow(`id with value 123 is not a string`)

//     }
    
// )
afterAll(() => database.disconnect())

})
