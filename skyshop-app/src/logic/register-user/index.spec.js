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
    let name, surname, email, password


    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result=await logic.registerUser(name, surname, email, password)
            expect(result).toBeUndefined()

            const user=await User.findOne({ email })  
            expect(user).toBeDefined()
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            //expect(user.password).toBe(password)

            /* const { sub } = jwt.verify(__userCredentials__.token, REACT_APP_JWT_SECRET_TEST)
        expect(sub).toBe(id) */
    })
    it('should fail if the mail already exists', async () => {
        try{
            await User.create({ name, surname, email, password })

        }catch(error){
            expect(error).toBeDefined
            expect(error.message).toBe(`user with e-mail ${email} already exists`)
        }})
    afterAll(() => database.disconnect())

    
    it('should fail on empty name', () =>
    expect(() =>
        logic.registerUser( '',surname,email,password)
    ).toThrow('name is empty or blank')
    )
    it('should fail on undefined name', () =>
        expect(() =>
        logic.registerUser( undefined,surname,email,password)
        ).toThrow(`name with value undefined is not a string`)
    )
    it('should fail on wrong name', () =>
    expect(() =>
        logic.registerUser( 124,surname,email,password)
    ).toThrow(`name with value 124 is not a string`)

    )
    
    it('should fail on empty surname', () =>
    expect(() =>
        logic.registerUser( name,'',email,password)
    ).toThrow('surname is empty or blank')
    )
    it('should fail on undefined surname', () =>
        expect(() =>
            logic.registerUser( name,undefined,email,password)
        ).toThrow(`surname with value undefined is not a string`)
    )
    it('should fail on wrong surname', () =>
    expect(() =>
        logic.registerUser( name,124,email,password)
    ).toThrow('name with value 124 is not a string')
    )

  it('should fail on empty email', () =>
    expect(() =>
        logic.registerUser( name,surname,'',password)
    ).toThrow('email is empty or blank')
    )
    it('should fail on undefined email', () =>
        expect(() =>
            logic.registerUser( name,surname,undefined,password)
        ).toThrow(`email with value undefined is not a string`)
    )

    it('should fail on empty password', () =>
    expect(() =>
        logic.registerUser( name,surname,email,'')
    ).toThrow('password is empty or blank')
    )  
    it('should fail on undefined password', () =>
        expect(() =>
            logic.registerUser( name,surname,email,undefined)
        ).toThrow(`password with value undefined is not a string`)
    ) 
    afterAll(() => database.disconnect())

})




