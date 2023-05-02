const Lender = require('../Models/Lender')
const bcrypt = require('bcrypt') //Used to Encrypt the Password
const joi = require('joi') //Used for Validation
const jwt = require('jsonwebtoken')

const secretKey = "HelloThere"


exports.register = async (req,res,next) => {
    const lenderSchema = joi.object({
        username: joi.string().required().min(3),
        password: joi.string().required().min(6).max(20),
        displayName: joi.string().required().min(3),
        type: joi.string().required(),
        phone: joi.string().required().min(10)
    })

    try{
        let lenderObj = await lenderSchema.validateAsync(req.body);
        let lender = await Lender.findOne({username:req.body.username})
        if(!lender)
        {   
            lender = new Lender(lenderObj);

            const salt = await bcrypt.genSalt(10);                          //Encrypting Thee Password
            lender.password = await bcrypt.hash(lender.password,salt)

            await lender.save();
            res.status(200).json({
                message:"Lender Registered Successfully ...",
                lender
            })
        }else{
            res.status(400).json({
                message:"Account already Exists ",
                lender
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong ......",
            error: err
        })
    }
}


exports.login = async(req,res) =>{
    const loginSchema = joi.object({
        username: joi.string().required(),
        password:joi.string().required()
    })

    try{
        const loginFields = await loginSchema.validateAsync(req.body)
        let lender = await Lender.findOne({username:loginFields.username})

        if(!lender)
        {
            res.status(401).json({
                message:"Username Doesn't exists  "
            })
        }else{

            const is_match = await bcrypt.compare(loginFields.password,lender.password)
            if(!is_match)
            {
                res.status(401).json({                     //401:-Unauthorize
                    message:"Passsword Doesn't matches"
                })
            }else{
                const payload = {
                    lenderdata:{
                        id:lender._id
                    }
                }

                const token = await jwt.sign(payload,secretKey,{expiresIn:7200})
                res.status(200).json({
                    message:"Logged In",
                    user:{id:lender._id,name:lender.displayName},
                    token
                })
            }
        }

    }catch(err){
        res.status(500).json({
            message:"Something went Wrong ",
            error:err
        })
    }
}

































































// exports.register = async (req,res,next) => {
//     const lenderObj = {
//         username: req.body.uname,
//         password: req.body.psswd,
//         displayName: req.body.dname,
//         type: req.body.type,
//         phone: req.body.phone
//     }
//     try{
//         let temp = await Lender.findOne({username:req.body.uname})
//         if(!temp)
//         {
//             const lender = new Lender(lenderObj);
//             await lender.save();
//             res.status(200).json({
//                 message:"Lender Registered Successfully ...",
//                 Data:lender
//             })
//         }else{
//             res.status(400).json({
//                 message:"Account already Exists "
//             })
//         }
//     }catch(err){
//         res.status(500).json({
//             message:"Something went Wrong ",
//             error: err
//         })
//     }
// }