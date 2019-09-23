require('dotenv').config() //nuevo
const { expect } = require('chai')
const authenticate=require('.')
const { database,models:{User} } = require('skyshop-data')
const bcrypt = require('bcryptjs')

const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - authenticate user', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo

    let name, surname, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user=await User.create({ name, surname, email, password: await bcrypt.hash (password, 10) })
            id = user.id
    })

    it('should succeed on correct data',async () =>{
        const _id=await authenticate(email, password)
        .then(_id => {
            expect(_id).to.exist
            expect(_id).to.be.a('string')
            expect(_id).to.equal(id)
        })
       
    })
    it('should fail on incorrect mail',async () => {
        try{
            await authenticate("pepito@mail.com", password)

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials.')
        }
    }

    )
    it('should fail on wrong password',async () =>{
        try{
            await authenticate(email, "123")

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('wrong credentials')
        }
    }) 

    it('should fail on empty email', () =>
    expect(() =>
        authenticate( '',password)
    ).to.throw('username is empty or blank')
    )
    it('should fail on undefined email', () =>
        expect(() =>
            authenticate( undefined,password)
        ).to.throw(`username with value undefined is not a string`)
    )
    it('should fail on incorrect email', () =>
        expect(() =>
            authenticate( 'sdfka',password)
        ).to.throw(`username with value sdfka is not a valid e-mail`)
    )

    it('should fail on empty password', () =>
    expect(() =>
        authenticate( email,'')
    ).to.throw('password is empty or blank')
    )
    it('should fail on undefined password', () =>
        expect(() =>
            authenticate( email,undefined)
        ).to.throw(`password with value undefined is not a string`)
    )


    after(() => database.disconnect())
})