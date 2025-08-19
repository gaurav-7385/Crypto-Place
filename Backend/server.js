import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Allow frontend domain to talk to backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Crypto-Place backend is running!");
});

// Routes
app.use("/api/auth", authRoute);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
