const express = require("express")
const {addCard,checkIfCardExists, getCardDetails} = require("../controller/Cards")
const {authUser} = require("../middleware/auth")
const router = express.Router()

router.route("/addCard").post(authUser,addCard)
router.route("/checkForCard").post(authUser,checkIfCardExists)
router.route("/getCard").get(getCardDetails)



module.exports = router
