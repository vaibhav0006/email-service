// src/routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const EmailService = require("../services/EmailService");

const emailService = new EmailService();

router.post("/send-email", async (req, res) => {
  const { emailId, emailDetails } = req.body;
  if (!emailId || !emailDetails) {
    return res.status(400).send("Missing emailId or emailDetails");
  }

  try {
    const result = await emailService.sendEmail(emailId, emailDetails);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
