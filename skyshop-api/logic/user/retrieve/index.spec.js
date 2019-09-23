require('dotenv').config() //nuevo
const { expect } = require('chai')
const retrieve=require('.')
const {database, models:{User} } = require('skyshop-data')

const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - retrieve user', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo

    let name, surname, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user=await User.create({ name, surname, email, password })
            id = user.id
    })

    it('should succeed on correct data', async() =>{
        const user=await retrieve(id)
        
            expect(user).to.exist
            expect(user.id).to.equal(id)
            expect(user._id).not.to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).not.to.exist
  
    })
    it('should throw an error with a wrong id',async () =>{
        try{
            await retrieve("5d5fe532b4f3f827e6fc64f8")

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`User with id 5d5fe532b4f3f827e6fc64f8 does not exist.`)

        }
    })

    it('should fail on empty id', () =>
    expect(() =>
        retrieve( "")
    ).to.throw('id is empty or blank')
    )
    it('should fail on undefined id', () =>
        expect(() =>
            retrieve( undefined)
        ).to.throw(`id with value undefined is not a string`)
    )
    it('should fail on wrong id', () =>
    expect(() =>
        retrieve( 123)
    ).to.throw(`id with value 123 is not a string`)
)
    after(() => database.disconnect())
})