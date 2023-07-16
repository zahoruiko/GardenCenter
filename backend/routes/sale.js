const express = require("express");

const router = express.Router();

router.get("/send", (req, res) => {
  res.json({ status: "ERR", message: "Please send POST request." });
});

router.post("/send", (req, res) => {
  res.json({ status: "OK", message: "Request processed." });
});

module.exports = router;
