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

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/diet", require("./routes/dietRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/progress", progressRoutes);

app.get("/", (req, res) => {
  res.send("AI Fitness Coach API is running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});