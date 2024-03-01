const express = require("express");
const { registerUser, loginUser, getAllUsers, getSingleUser } = require("../controllers/UsersController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser);

module.exports = router;
