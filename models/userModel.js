const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        user_id : {
            type : String,
            required : true,
            unique : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            index : true 
        },

        password : {
            type : String,
            required : true
        }
    },
    {
        collection : 'users'
    }
)

module.exports = mongoose.model('users', userSchema)