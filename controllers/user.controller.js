const User = require('../Models/User')
const bcrypt = require('bcrypt') //Used to Encrypt the Password
const joi = require('joi') //Used for Validation


const jwt = require('jsonwebtoken')
const secretKey = "HelloThere"


exports.register = async (req,res,next) => {
    const userSchema = joi.object({
        userid: joi.string().required().min(3),
        password: joi.string().required().min(6).max(20),
        userphone: joi.string().required().min(3),
        name: joi.string().required().min(5),
    })
    try{
        let userObj = await userSchema.validateAsync(req.body);
        let user = await User.findOne({userid:req.body.userid})
        if(!user)
        {   
            user = new User(userObj);

            const salt = await bcrypt.genSalt(10);                          //Encrypting Thee Password
            user.password = await bcrypt.hash(user.password,salt)

            await user.save();
            res.status(200).json({
                message:"User Registered Successfully ...",
                user
            })
        }else{
            res.status(400).json({
                message:"Account already Exists ",
                user
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
        userid: joi.string().required(),
        password:joi.string().required()
    })

    try{
        const loginFields = await loginSchema.validateAsync(req.body)
        let user = await User.findOne({userid:loginFields.userid})

        if(!user)
        {
            res.status(401).json({
                message:"Username Doesn't exists  "
            })
        }else{

            const is_match = await bcrypt.compare(loginFields.password,user.password)
            if(!is_match)
            {
                res.status(401).json({                     //401:-Unauthorize
                    message:"Passsword Doesn't matches"
                })
            }else{
                const payload = {
                    lenderdata:{
                        id:user._id
                    }
                }

                const token = await jwt.sign(payload,secretKey,{expiresIn:7200})
                res.status(200).json({
                    message:"Logged In",
                    user:{customer_id:user._id,customer_name:user.name},
                    token
                })
            }
        }

    }catch(err){
        res.status(500).json({
            message:"Something went Wrong ...",
            error:err
        })
    }
}