const mongoose = require('mongoose')

const LenderSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('lenders',LenderSchema)