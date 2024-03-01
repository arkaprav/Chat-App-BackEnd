const express = require("express");
const { getCurrUser } = require("../controllers/UsersController");
const validateUser = require("../middlewares/validateUser");
const router = express.Router();

router.use(validateUser);
router.route("/").get(getCurrUser);

module.exports = router;
