const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const workoutRoutes = require("./routes/workoutRoutes");
const dietRoutes = require("./routes/dietRoutes");
const progressRoutes = require("./routes/progressRoutes");

dotenv.config();
connectDB();

const app = express();

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Use env var for prod, fallback to local Vite default
  optionsSuccessStatus: 200
};

// Use the restrictive CORS setup if a specific FRONTEND_URL is provided,
// otherwise allow all (for easier initial development)
if (process.env.FRONTEND_URL) {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/diet", require("./routes/dietRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/progress", progressRoutes);

app.get("/", (req, res) => {
  res.send("AI Fitness Coach API is running");
});

// Fallback to 5000 if PORT is not specified (e.g. locally)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
