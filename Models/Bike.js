const mongoose = require('mongoose')

const BikeSchema = mongoose.Schema({

    lenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lenders'
    },
    bikeName:{
        type:String,
        required:true
    },
    bikeDesc:{
        type:String,
        required:true
    },
    priceDay:{
        type:Number,
        required:true
    },
    avaibility:{
        type:Number,
        required: true
    },
    totalbikes:{
        type:Number,
        required:true
    },
    bikeImgUrl:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('bikes',BikeSchema)