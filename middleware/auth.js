const jwt = require('jsonwebtoken')
const secretKey = "HelloThere"

const auth = async (req,res,next) =>  {
    if(req.header('x-auth-token')){
        const token = req.header('x-auth-token')
        try{
            await jwt.verify(token,secretKey)
            next();
        }catch(err){
            res.status(401).json({  //Unauthorized
                message:"Unauthorized Request!! Bad Token "
            })
        }

    }else{
        res.status(401).json({  //Unauthorized
            message:"Unauthorized Request!! Token Missing "
        })
    }
}

module.exports = auth;