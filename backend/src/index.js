import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
 cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
 }),
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
 console.log(`Server is running on PORT:${PORT}`);
 connectDB();
});
