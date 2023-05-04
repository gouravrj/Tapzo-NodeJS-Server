const History = require('../Models/History')
const Bike = require('../Models/Bike')
const Lender = require('../Models/Lender')
const User = require('../Models/User')


exports.register = async(req,res,next) => {
    const historyObj = {
        lenderId: req.body.lid,
        bikeId: req.body.bid,
        userId: req.body.uid,
        days:req.body.day,
        totalCost:req.body.cost,
        isCompleted: req.body.iscomp,
        date: req.body.date
    }
    try{
        const history = new History(historyObj)
        await history.save()
        res.status(200).json({
            message:"History Saved Successfully",
            historyData: history
        })
    }catch(err){
        res.status(500).json({
            message: "Something went Wrong",
            error:err
        })
    }
}

exports.update = async(req,res,next) => {
    const id = req.params.id;
    const historyObj = {
        lenderId: req.body.lid,
        bikeId: req.body.bid,
        userId: req.body.uid,
        days:req.body.day,
        totalCost:req.body.cost,
        isCompleted: req.body.iscomp,
        date: req.body.date
    }
    try{
        const temp = await History.findById(id)
        console.log(temp)

        const updatedPost = await History.findByIdAndUpdate(id,{$set:historyObj})
        if(updatedPost==null){
            res.status(400).json({
                message:"History didn't Updated Successfully/ID Not Found"
            })
        }else{
            res.status(200).json({
                message:"History Updated Successfully",
                updatedHistory: updatedPost
            })
            }
    }catch(err){
        res.status(500).json({
            message:"Something Went Wrong",
            error:err
        })
    }
}


exports.getHistoryByUser = async(req,res) =>{
    
    var ans=[]
    const userId = req.params.id
    try{ 
        let histories = await History.find({userId:userId}).populate('userId')
        // console.log(histories)
        if(!histories)
            histories=[]
        
        for(let i=0;i<histories.length;i++)
        {
            
            bike = await Bike.findById(histories[i].bikeId)
            lender = await Lender.findById(histories[i].lenderId)
            user = await User.findById(histories[i].userId._id)
  
    
            const temp = {
                days:histories[i].days,
                totalcost:histories[i].totalCost,
                iscompleted:histories[i].isCompleted,
                date:histories[i].date,
                bikeimg:bike.bikeImgUrl,
                bikeprice:bike.priceDay,
                bikename:bike.bikeName,
                lendername:lender.displayName,
                lenderphone:lender.phone,
                username:user.name,
                userphone:user.userphone
            }
            ans.push(temp)
            
        }
        res.status(200).json({
            message:"Histories Fetched Successfully",
            historyData: ans
        })

    }catch(err){
        res.status(200).json({
            message:"Something went Wrong ",
            error:err
        })
    }
    
}

exports.getHistoryByLender = async(req,res) =>{
    
    var ans=[]
    const lenderId = req.params.id
    try{ 
        let histories = await History.find({lenderId:lenderId}).populate('lenderId')
        // console.log(histories)
        if(!histories)
            histories=[]
        
        for(let i=0;i<histories.length;i++)
        {
            
            bike = await Bike.findById(histories[i].bikeId)
            lender = await Lender.findById(histories[i].lenderId)
            user = await User.findById(histories[i].userId._id)
  
    
            const temp = {
                historyid:histories[i]._id,
                bikeID:bike._id,
                days:histories[i].days,
                totalcost:histories[i].totalCost,
                iscompleted:histories[i].isCompleted,
                date:histories[i].date,
                bikeimg:bike.bikeImgUrl,
                bikeprice:bike.priceDay,
                bikename:bike.bikeName,
                lendername:lender.displayName,
                lenderphone:lender.phone,
                username:user.name,
                userphone:user.userphone
            }
            ans.push(temp)
            
        }
        res.status(200).json({
            message:"Histories Fetched Successfully",
            historyData: ans
        })

    }catch(err){
        res.status(200).json({
            message:"Something went Wrong ",
            error:err
        })
    }
}

exports.completedStatusToTrue = async(req,res,next) => {
    const id = req.params.id;
    try{
        const updatedPost = await History.findByIdAndUpdate(id,{isCompleted:true})
        if(updatedPost==null){
            res.status(400).json({
                message:"History didn't Updated Successfully/ID Not Found"
            })
        }else{
            res.status(200).json({
                message:"History Updated Successfully",
                updatedPost:updatedPost
            })
            }
    }catch(err){
        res.status(500).json({
            message:"Something Went Wrong",
            error:err
        })
    }
}