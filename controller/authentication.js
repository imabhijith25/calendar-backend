const User  = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.login = async (req,res,next)=>{
    const {email, password}  = req.body
    if(!email || !password){
        return res.status(400).send({
            success:"false",
            message:"Enter complete credentials"

        })
    }

    const user =  await User.findOne({email})
    if(user){
        const passCheck = await bcrypt.compare(password, user.password)
        if(passCheck){
            sendResponseToken(user,res)
        }
        else{
            return res.status(400).send({
                success:false,
                message:"Invalid credentials"
            })
    
        }

        
    }
    else{
        return res.status(400).send({
            success:false,
            message:"User Does Not Exists"
        })
    }
    



}

//post request
//api/v1/authentication/register
exports.register = async (req,res, next) =>{
    try{
        const email = req.body.email
        const oldUser = await User.findOne({email})
    
        if(oldUser){
            return res.status(400).send({
                success:"False",
                type:"email",
                message:"User Already Exists"
            })
        }
        const encryptedPassword = await bcrypt.hash(req.body.password,10)
        const registerValues= {
            name:req.body.name,
            email:req.body.email,
            password: encryptedPassword,
            
        }
    
    
        const data  = await User.create(registerValues)
        
        sendResponseToken(data,res)
    }
    catch{
        res.status(400).send({
            success:false,
            message:"Unexpected error occured"
        })
    }
}

exports.getProfile = async (req,res)=>{
    const userId = req.user

    try{
        const user = await User.findById(userId)
        const {name,email,id} = user
        return res.status(200).send({
            success:true,
            data:{
                name,
                email,
                id
            }
        })
    }
    catch{
        return res.status(400).send({
            success:false,
            message:"Data fetch failed"
        })
    }
}


const sendResponseToken=(data,res)=>{

    const token = jwt.sign(
        {id:data._id},
        process.env.SECRET_KEY,
        {expiresIn: "2h"}
    )

    const response = {
        success:true,
        token
    }

    return res.status(200).send(response)

}


