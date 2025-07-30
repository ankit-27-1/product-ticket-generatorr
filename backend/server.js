const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const createRoutes = require("./routes/createRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/user", userRoutes);
app.use("/api/tickets", createRoutes);
app.use("/api/employee", employeeRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
