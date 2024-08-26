const { log } = require("../utils/logger");

class StatusTracker {
  constructor() {
    if (!StatusTracker.instance) {
      this.status = new Map(); // Simple in-memory store
      StatusTracker.instance = this;
    }
    return StatusTracker.instance;
  }

  trackSuccess(emailId) {
    this.status.set(emailId, "Success");
    log("INFO", `Status updated to Success for email ID ${emailId}`);
  }

  trackFailure(emailId, error) {
    this.status.set(emailId, `Failed: ${error}`);
    log("ERROR", `Status updated to Failure for email ID ${emailId}: ${error}`);
  }

  getStatus(emailId) {
    return this.status.get(emailId) || "Unknown";
  }
}

module.exports = StatusTracker;
