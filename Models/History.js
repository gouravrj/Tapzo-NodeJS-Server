const { boolean } = require('joi')
const mongoose = require('mongoose')

const HistorySchema = mongoose.Schema({

    lenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lenders'
    },
    bikeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bikes'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    days:{
        type:String,
        required:true
    },
    totalCost:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('history',HistorySchema)