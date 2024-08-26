const { log } = require("../utils/logger");

class IdempotencyService {
  constructor() {
    this.sentEmails = new Set(); // Simple in-memory store
  }

  async isDuplicate(emailId) {
    if (this.sentEmails.has(emailId)) {
      log("INFO", `Duplicate email detected for ID ${emailId}`);
      return true;
    }
    this.sentEmails.add(emailId);
    return false;
  }
}

module.exports = IdempotencyService;
