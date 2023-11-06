const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = require('../models/userModel')

const addNewUser = async (request, response) => {
    const {email, password} = request.body
    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password,10)

    try{
        const existingUser = await users.findOne({email})

        if(existingUser){
            return response.status(409).json({errorMessage : "User Already Exist, try to Login."})
        }

        const newUserData = {
            user_id : generatedUserId,
            email : email,
            password : hashedPassword
        }

        const addedUser = await users.insertMany([newUserData])

        const token = jwt.sign(
                {addedUser},
                process.env.JWT_KEY,
                {expiresIn : 60*24}
            )

        return response.status(201).json({token : token,user_id :  newUserData.user_id})
        
    }
    catch(error){
        return response.status(500).json({ errorMessage : error.message})
    }
}



module.exports = {
    addNewUser,
}