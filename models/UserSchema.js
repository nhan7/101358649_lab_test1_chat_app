const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        length:15
    },
    firstName:{
        type:String,
        required: true,
        length:15
    },
    lastName:{
        type:String,
        required: true,
        length:15
    },

    password:{
        type:String,
        required: true,
        length:15
    },date:{
        type:Date,
        default: Date.now,
    }
})


const User = mongoose.model('User', UserSchema)
module.exports = User;