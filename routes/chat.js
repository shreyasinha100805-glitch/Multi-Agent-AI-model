const express = require("express");
const router = express.Router();

// import properly
const { handleChat } = require("../controllers/chatController");

// use function
router.post("/", handleChat);

module.exports = router;
console.log("TYPE:", typeof handleChat);