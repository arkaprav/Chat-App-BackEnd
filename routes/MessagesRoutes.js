const express = require("express");
const validateUser = require("../middlewares/validateUser");
const { getAllMessages, getOne2OneMessages } = require("../controllers/MessagesController");
const router = express.Router();

router.use(validateUser);
router.route("/").get(getAllMessages);
router.route("/:id").get(getOne2OneMessages);

module.exports = router;