const express = require("express")
const {login} = require("../controller/authentication")
const router = express.Router()

router.route("/login").get(login)

module.exports = router