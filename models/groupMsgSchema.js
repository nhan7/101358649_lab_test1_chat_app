const mongoose = require('mongoose')

const groupMsgSchema = mongoose.Schema({
    from_user:{
        type:String,
        length:100
    },
    room:{
        type:String,
        unique: true,
        
    },
    message:{
        type:String,
        length:100
    },
    date_sent:{
        type:Date,
        default: Date.now
    }



})


const groupMsg = mongoose.model('groupMsg', groupMsgSchema)
module.exports = groupMsg 