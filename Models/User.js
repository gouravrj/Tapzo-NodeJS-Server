const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    userid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userphone:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('users',UserSchema)