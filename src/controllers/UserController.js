const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async store(req,res){
        try {
            console.log(req.body)
            const {firstName,lastName,email,password} = req.body

            const existingUser = await User.findOne({email})
            if(!existingUser){
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword
                })
                return res.json(user)
            }
            return res.status(400).json({
                message: "User already exist! do you want to login?"
            })
        } catch (error) {
            throw Error(`Error while registering new user ${error}`)
        }
    }
}