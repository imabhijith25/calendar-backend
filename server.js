const express = require("express")
const dotenv  = require("dotenv")
const router = require("./Routes/routes")
const cards = require("./Routes/Cards")
const ConnectDb = require("./config/db")
const cors = require("cors")
dotenv.config({path:"./config/.env"})

ConnectDb()

const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.use("/api/v1/authentication",router)
app.use("/api/v1/cards",cards)

app.listen(process.env.PORT, console.log("Server started"))