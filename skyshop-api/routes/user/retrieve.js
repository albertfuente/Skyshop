const logic = require('../../logic')

module.exports = async(req, res) => {

    const { params: { id } } = req

    try {
       await logic.user.retrieve(id)
            .then(user => res.json({ message: 'user retrieved correctly', user }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }

} 

