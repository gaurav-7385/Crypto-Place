import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // e.g., http://localhost:5173
    credentials: true,
  })
);

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
