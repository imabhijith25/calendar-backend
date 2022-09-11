const Cards  = require("../models/Cards")
exports.addCard = async (req,res,next)=>{
    const {cardUrl,name, description,address, profilePicUrl} = req.body
    const user = req.user
    try{
        if(cardUrl && name && description && address){
            const cardFound= await Cards.findOne({cardUrl})
            if(cardFound){
                return res.status(400).send({success:false, message:"card Url already exists"})
            }
            else{
                const payload = {
                    cardUrl,
                    name,
                    description,
                    address,
                    user,
                    profilePicUrl
                }
                console.log(payload)
                const data = await Cards.create(payload)
                return res.status(200).send({data,success:true, message:"Created successfully"})
            }


        }
        else{
            return res.status(400).send({success:false, message:"Enter complete credentials"})
        }

    }
    catch(err){
        console.log(err)
        return res.status(400).send({success:false, message:"Unexpected error occured"})
    }
    

}


exports.checkIfCardExists = async (req,res,next)=>{
    const {cardUrl } = req.body
    try{
        const data = await Cards.findOne({cardUrl})
        if(data){
            return res.status(400).send({success:false, message:"Card already exists"}) 
        }
        else{
            return res.status(200).send({success:true, message:"Card available"})
        }
    }
    catch(err){
        return res.status(400).send({success:false, message:"Unexpected error occured"})
    }

}

exports.getCardDetails = async (req,res,next)=>{
    const {cardUrl} = req.body


    try{
        const details  = await Cards.findOne({cardUrl})
        if(details){
            return res.status(200).send({success:true, data:details, message:"Details fetched Successfully"})
        }
        else{
            return res.status(400).send({success:false, message:"details not available"})
        }
    }
    catch(err){
        return res.status(400).send({success:false, message:"Unexpected error occured"})
    }

}