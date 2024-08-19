const User = require('../models/user')
const bcrypt = require('bcryptjs')

const handleNewUser = async (req,res) => {
    const { name, email, password } = req.body
    const { first_name, last_name} = name
    if ( !email || !password) return res.status(400).json({ 'message': 'email and password are required' })

    // check for duplicate emails in the db
    const duplicate = await User.findOne({ email: email }).exec()
    if (duplicate) return res.sendStatus(409) // Conflict error

    try {
        // encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // create and store the new email
        const result = await User.create({ 
            name: {
                first_name: first_name,
                last_name: last_name,
            },
            email: email.toLowerCase(), 
            password: encryptedPassword
        })
        console.log(result)

        res.status(201).json({ 'success': `New account for ${first_name + ' ' + last_name} created!`})
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleNewUser }