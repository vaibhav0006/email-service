const { log } = require("../utils/logger");

class RateLimiter {
  constructor() {
    this.limits = new Map(); // Simple in-memory store
  }

  async isRateLimited(emailId) {
    // Simple rate limiting logic
    if (!this.limits.has(emailId)) {
      this.limits.set(emailId, Date.now());
      return false;
    }
    const lastSent = this.limits.get(emailId);
    const now = Date.now();
    if (now - lastSent < 60000) {
      // 1 minute limit
      log("WARN", `Rate limit exceeded for email ID ${emailId}`);
      return true;
    }
    this.limits.set(emailId, now);
    return false;
  }
}

module.exports = RateLimiter;
