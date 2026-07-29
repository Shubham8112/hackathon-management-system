const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");
const participantRoutes = require("./routes/participantRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/participants",participantRoutes);

app.get("/", (req, res) => {
  res.send("Hackathon Management Platform API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to your profile",
    user: req.user,
  });
});