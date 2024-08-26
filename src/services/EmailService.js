const MockGmailProvider = require("../providers/MockGmailProvider");
const MockYahooProvider = require("../providers/MockYahooProvider");
const RateLimiter = require("./RateLimiter");
const IdempotencyService = require("./IdempotencyService");
const StatusTracker = require("./StatusTracker");
const EmailQueue = require("./EmailQueue");
const { log } = require("../utils/logger");

class EmailService {
  constructor() {
    this.providers = [new MockGmailProvider(), new MockYahooProvider()];
    this.currentProvider = 0;
    this.rateLimiter = new RateLimiter();
    this.idempotencyService = new IdempotencyService();
    this.statusTracker = new StatusTracker();
    this.emailQueue = new EmailQueue();
  }

  async sendEmail(emailId, emailDetails) {
    log("INFO", `Queueing email with ID ${emailId}`);
    this.emailQueue.addEmailToQueue(emailId, emailDetails);
    return `Email with ID ${emailId} added to queue for processing`;
  }

  async _sendEmail(emailId, emailDetails) {
    if (await this.rateLimiter.isRateLimited(emailId)) {
      const errorMessage = "Rate limit exceeded";
      log("WARN", errorMessage);
      throw new Error(errorMessage);
    }

    if (await this.idempotencyService.isDuplicate(emailId)) {
      log("INFO", "Duplicate email send attempt detected.");
      return "Duplicate email send attempt";
    }

    for (let i = 0; i < this.providers.length; i++) {
      try {
        const result = await this.providers[this.currentProvider].sendEmail(
          emailDetails
        );
        this.statusTracker.trackSuccess(emailId);
        log("INFO", `Email sent successfully with ID ${emailId}: ${result}`);
        return result;
      } catch (error) {
        this.statusTracker.trackFailure(emailId, error.message);
        log(
          "ERROR",
          `Error sending email with ID ${emailId}: ${error.message}`
        );
        this.currentProvider =
          (this.currentProvider + 1) % this.providers.length;
        await this.retryAfterFailure();
      }
    }

    const errorMessage = "All providers failed";
    log("ERROR", errorMessage);
    throw new Error(errorMessage);
  }

  async retryAfterFailure() {
    const delay = Math.pow(2, this.currentProvider) * 1000; // Exponential backoff
    log("INFO", `Retrying after ${delay} ms due to failure.`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

module.exports = EmailService;
