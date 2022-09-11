const express = require("express")
const {login,register,getProfile} = require("../controller/authentication")
const {authUser} = require("../middleware/auth")
const router = express.Router()

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/getProfile").get(authUser,getProfile)

module.exports = router