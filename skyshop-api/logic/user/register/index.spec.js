require('dotenv').config() //nuevo

const { expect } = require('chai')
//const logic = require('../../.') no llamas a la logica llamas al metodo
const register=require('.')
const { database,models:{User} } = require('skyshop-data')
const bcrypt = require('bcryptjs')
//const mongoose = require('mongoose')

const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo

    let name, surname, email, password

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result=await register(name, surname, email, password)
            expect(result).not.to.exist

            const user=await User.findOne({ email })  
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            //expect(user.password).to.equal(password)

            const match = await bcrypt.compare(password, user.password)
            expect(match).to.be.true
    })
    it('should fail if the mail already exists', async () => {
        try{
            await User.create({ name, surname, email, password })

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with e-mail ${email} already exists`)
        }})

    it('should fail on empty name', () =>
    expect(() =>
        register( '',surname,email,password)
    ).to.throw('name is empty or blank')
    )
    it('should fail on undefined name', () =>
        expect(() =>
            register( undefined,surname,email,password)
        ).to.throw(`name with value undefined is not a string`)
    )
    it('should fail on wrong name', () =>
    expect(() =>
        register( 124,surname,email,password)
    ).to.throw(`name with value 124 is not a string`)
)

    it('should fail on empty surname', () =>
    expect(() =>
        register( name,'',email,password)
    ).to.throw('surname is empty or blank')
    )
    it('should fail on undefined surname', () =>
        expect(() =>
            register( name,undefined,email,password)
        ).to.throw(`surname with value undefined is not a string`)
    )
    it('should fail on wrong surname', () =>
    expect(() =>
        register( name,124,email,password)
    ).to.throw('name with value 124 is not a string')
    )

  it('should fail on empty email', () =>
    expect(() =>
        register( name,surname,'',password)
    ).to.throw('username is empty or blank')
    )
    it('should fail on undefined email', () =>
        expect(() =>
            register( name,surname,undefined,password)
        ).to.throw(`username with value undefined is not a string`)
    )

    it('should fail on empty password', () =>
    expect(() =>
        register( name,surname,email,'')
    ).to.throw('password is empty or blank')
    )  
    it('should fail on undefined password', () =>
        expect(() =>
            register( name,surname,email,undefined)
        ).to.throw(`password with value undefined is not a string`)
    ) 
    after(() => database.disconnect())
})