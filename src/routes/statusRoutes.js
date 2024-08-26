// src/routes/statusRoutes.js
const express = require("express");
const StatusTracker = require("../services/StatusTracker");

const router = express.Router();
const statusTracker = new StatusTracker(); // Ensure this is a singleton instance

// Route to get the status of an email
router.get("/status/:emailId", (req, res) => {
  const { emailId } = req.params;
  const status = statusTracker.getStatus(emailId);
  if (status) {
    res.status(200).json({ emailId: emailId, status: status });
  } else {
    res.status(404).send("Status not found");
  }
});

module.exports = router;
