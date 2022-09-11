const mongoose = require("mongoose")


const ConnectDb = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI )

    console.log("Db connected")
}

module.exports = ConnectDb;