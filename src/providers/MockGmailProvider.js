const { log } = require("../utils/logger");

class MockGmailProvider {
  async sendEmail(emailDetails) {
    log(
      "INFO",
      `Attempting to send email via Gmail provider with details: ${JSON.stringify(
        emailDetails
      )}`
    );

    try {
      if (Math.random() > 0.8) {
        // Simulate occasional failure
        const errorMessage = "Gmail provider failed";
        log("ERROR", errorMessage);
        throw new Error(errorMessage);
      }
      const result = "Gmail: Email sent";
      log("INFO", result);
      return result;
    } catch (error) {
      log("ERROR", `Exception: ${error.message}`);
      throw error;
    }
  }
}

module.exports = MockGmailProvider;
