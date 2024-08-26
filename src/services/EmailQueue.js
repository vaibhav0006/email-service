const { log } = require("../utils/logger");

class EmailQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  addEmailToQueue(emailId, emailDetails) {
    this.queue.push({ emailId, emailDetails });
    log("INFO", `Added email with ID ${emailId} to queue.`);
    this.processQueue();
  }

  async processQueue() {
    if (this.processing) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const { emailId, emailDetails } = this.queue.shift();
      log("INFO", `Processing email with ID ${emailId}`);

      try {
        const result = await this.sendEmail(emailId, emailDetails);
        log("INFO", `Email sent successfully: ${result}`);
      } catch (error) {
        log(
          "ERROR",
          `Failed to send email with ID ${emailId}: ${error.message}`
        );
      }
    }

    this.processing = false;
  }

  async sendEmail(emailId, emailDetails) {
    // Simulate the email sending process
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Email sent to ${emailDetails.to}`);
      }, 1000);
    });
  }
}

module.exports = EmailQueue;
