const express = require("express");
const { signup, login, protect, getMyProfile } = require("../controller/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/myprofile", [protect, getMyProfile]);

module.exports = router;
