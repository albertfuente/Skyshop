const logic = require('../../logic')

module.exports = async(req, res) => {

    const { params: { id }, body: { password } } = req

    try {
        await logic.user.unregister(id,password)
            .then(() => res.json({ message: 'User unregistered successfully'}))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
