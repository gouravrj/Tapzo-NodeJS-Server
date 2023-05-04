const Bike = require('../Models/Bike')

exports.listBikes =  async (req,res,next)=>{
    
    try{
        // const bikes = await Bike.find()
        const bikes = await Bike.find().populate('lenderId')
        if(!bikes){
            bikes=[]
        }
        res.status(200).json({
            message:"Bikes fetched Successfully .....",
            bikes: bikes
        })
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong",
            error:err
        })
    }
}

exports.getbyID =  async (req,res,next)=>{
    const id = req.params.id;
    try{
        const bike = await Bike.findById(id)
        if(bike){
            res.status(200).json({
                message:"Bike fetched Successfully .....",
                bikes: bike
            })
        }else{
            req.status(400).json({
                message:"Bike Id Doesn't Exists .."
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong",
            error:err
        })
    }
}

exports.decrementAvaibility = async(req,res,next) => {
    const id = req.params.id;
    try{
        const temp = await Bike.findById(id)
        avb = temp.avaibility
        avb = avb-1;
        const updatedPost = await Bike.findByIdAndUpdate(id,{avaibility:avb})
        if(updatedPost==null){
            res.status(400).json({
                message:"Bike didn't Updated Successfully/ID Not Found"
            })
        }else{
            res.status(200).json({
                message:"Bike Updated Successfully",
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
exports.incrementAvaibility = async(req,res,next) => {
    const id = req.params.id;
    try{
        const bike = await Bike.findById(id)
        if(bike.avaibility == bike.totalbikes){
            consolelog("Do Nothing")
        }else{
            
        const temp = await Bike.findById(id)
        avb = temp.avaibility
        avb = avb+1;
        const updatedPost = await Bike.findByIdAndUpdate(id,{avaibility:avb})
        if(updatedPost==null){
            res.status(400).json({
                message:"Bike didn't Updated Successfully/ID Not Found"
            })
        }else{
            res.status(200).json({
                message:"Bike Updated Successfully",
                updatedPost:updatedPost
            })
        }

        }
    }catch(err){
        res.status(500).json({
            message:"Something Went Wrong",
            error:err
        })
    }
}

exports.createBike = async(req,res,next)=>{
    const path = "https://tapzo-nodejs-server-production.up.railway.app/uploads/"+req.file.filename
    const bikeObj = {

        lenderId: req.body.lid,
        bikeName: req.body.bname,
        bikeDesc: req.body.bdesc,
        priceDay:req.body.pday,
        avaibility:req.body.avb,
        totalbikes: req.body.total,
        bikeImgUrl: path
    }
    try{
        const bike = new Bike(bikeObj)
        await bike.save()
        res.status(200).json({
            message:"Bike Saved Successfully",
            bikeData:bike
        })
    }catch(err){
        res.status(500).json({
            message: "Something went Wrong",
            error:err
        })
    }
}

exports.deleteBike = async (req,res,next)=>{
    const id = req.params.id
    try{
        const deletedPost = await Bike.findByIdAndDelete(id)
        if(deletedPost == null){
            res.status(400).json({
                message:"Bike didn't Deleted Successfully/ID Not Found"
            })
        }else{
            res.status(200).json({
                message:"Bike Deleted Successfully"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something Went Wronggggg",
            error:err
        })
    }
}

exports.updateBike = async (req,res,next)=>{
    const id = req.params.id;
    const bikeObj = {
        lenderId: req.body.lid,
        bikeName: req.body.bname,
        bikeDesc: req.body.bdesc,
        priceDay:req.body.pday,
        avaibility:req.body.avb,
        totalbikes: req.body.total,
        bikeImgUrl: req.body.bikeimgurl
    }
    try{
        const temp = await Bike.findById(id)
        console.log(temp)

        const updatedPost = await Bike.findByIdAndUpdate(id,{$set:bikeObj})
        if(updatedPost==null){
            res.status(400).json({
                message:"Bike didn't Updated Successfully/ID Not Found"
            })
        }else{
            res.status(200).json({
                message:"Bike Updated Successfully",
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


exports.getBikeByLender = async(req,res) =>{
 
    try{ 
        let bikes = await Bike.find({lenderId:req.params.lenderid}).populate('lenderId')
        if(!bikes)
            bikes=[]

            res.status(200).json({
                message:"Bikes Fetched Successfully",
                bikeData: bikes
            })

    }catch(err){
        res.status(200).json({
            message:"Something went Wrong ",
            error:err
        })
    }
}