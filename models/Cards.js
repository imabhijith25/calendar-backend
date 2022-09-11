const mongoose = require("mongoose")


const Cards = new mongoose.Schema({
    cardUrl :{
        type:"String",
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },

    name :{
        type:"String",
        required:[true, "Please enter a name"],
        maxlength:50

    },
    description:{
        type:"String",
        
    },
    address:{
        type:"String",
        required:[true, "Please enter an address"],
        maxlength:140
    },
    profilePicUrl:{
        type:"String",
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      }
})

module.exports = mongoose.model( "Cards", Cards)