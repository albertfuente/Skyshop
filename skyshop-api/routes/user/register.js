const logic = require('../../logic')

module.exports = async(req, res) =>{

    const { body: {name, surname, email, password,isAdmin=false } } = req

    try {
        await logic.user.register(name, surname, email, password, isAdmin)
            .then(() => res.status(201).json({ message: 'User registered successfully'}))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}