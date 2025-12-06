const express = require("express")
const router = express.Router()
const { signUpUser, loginUser } = require("../controller/user.controller")
const uploadUserImg = require("../middleware/userImgUpload")

// -------------------------------------------------

router.post("/signup", uploadUserImg.single("profileImg"), signUpUser)
router.post("/login", loginUser)

module.exports = router