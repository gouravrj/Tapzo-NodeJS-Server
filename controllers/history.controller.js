const History = require('../Models/History')

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