const express = require("express");

const router = express.Router();

router.get("/get", (req, res) => {
  res.json({ status: "ERR", message: "Please send POST request." });
});

router.post("/get", (req, res) => {
  res.json({ status: "OK", message: "Request processed." });
});

module.exports = router;
