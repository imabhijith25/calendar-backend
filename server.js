const express = require("express")
const dotenv  = require("dotenv")
const router = require("./Routes/routes")
dotenv.config({path:"./config/.env"})


const app = express()

app.use("/api/v1/authentication",router)

app.listen(process.env.PORT, console.log("Server started"))