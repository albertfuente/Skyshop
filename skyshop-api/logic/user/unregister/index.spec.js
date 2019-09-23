require('dotenv').config() //nuevo
const { expect } = require('chai')
const unregister=require('.')
const {database, models:{User} } = require('skyshop-data')
const bcrypt = require('bcryptjs')


const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - unregister user', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo

    let name, surname, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user=await User.create({ name, surname, email, password: await bcrypt.hash (password, 10)  })
            id = user.id
    })

    it('should succeed on correct data',async () =>{
        const result=await unregister(id, password)
 
        expect(result).not.to.exist
        const user=await User.findById(id)  
        expect(user).not.to.exist
    })

    it('should fail on unexisting user',async () =>{
        try{
            await unregister('5d5d5530531d455f75da9fF9', password)
            throw Error('should not reach this point') 

        }catch(error){
            expect(error.message).to.equal('Wrong credentials.')

        }
    })

    it('should fail on existing user, but wrong password', async() =>{
        try{
            await unregister(id, 'wrong-password')

        }catch(error){
            expect(error.message).to.equal('wrong credentials')

        }
    })

    it('should fail on empty id', () =>
    expect(() =>
        unregister( '',password)
    ).to.throw('id is empty or blank')
    )
    it('should fail on undefined id', () =>
        expect(() =>
            unregister( undefined,password)
        ).to.throw(`id with value undefined is not a string`)
    )
    it('should fail on wrong id', () =>
    expect(() =>
        unregister( 123,password)
    ).to.throw(`id with value 123 is not a string`)
)

    it('should fail on empty password', () =>
    expect(() =>
        unregister( id,'')
    ).to.throw('password is empty or blank')
    )
    it('should fail on undefined password', () =>
        expect(() =>
            unregister( id,undefined)
        ).to.throw(`password with value undefined is not a string`)
    )

    after(() => database.disconnect())
})