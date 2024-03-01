const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).json({ message: "test!!" });
});

module.exports = router;
