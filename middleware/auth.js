const jwt = require('jsonwebtoken');
const User  = require("../models/User")
exports.authUser = (req,res,next)=>{
    let token;
    try{
        if(req.headers.authorization && 
            req.headers.authorization.startsWith('Bearer')){
                token = req.headers.authorization.split(" ")[1]
                const decode = jwt.verify(token,  process.env.SECRET_KEY)
                req.user = decode?.id
                next()
    
            }
        else{
            return res.status(400).send({
                success:false,
                message:"User not authenticated"
            })
        }
    }
    catch(err){
        return res.status(400).send({
            success:false,
            message:"User not authenticated"
        })
    }
}