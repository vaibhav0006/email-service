const fs = require("fs");
const path = require("path");

// Define the log file path
const logFile = path.join(__dirname, "../../logs/app.log");

// Function to log messages
const log = (level, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${level}] - ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

module.exports = { log };
