// src/app.js
const express = require("express");
const app = express();
const emailRoutes = require("./routes/emailRoutes");
const statusRoutes = require("./routes/statusRoutes");

app.use(express.json());
app.use("/api", emailRoutes);
app.use("/api", statusRoutes);

app.listen(3000, () => {
  console.log("Email service running on port 3000");
});
