const mongoose = require("mongoose")

const User = new mongoose.Schema({
    
    name:{
        type:String,
        required: [true, 'Please add a name'],

    },
    email:{
        type:String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ],
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        
    },
    password:{
        type:String,
        required: [true, 'Please add an email'],
    }
});


module.exports = mongoose.model('User', User)