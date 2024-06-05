import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

// File imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import generalRoomRoutes from "./routes/generalRoomRoutes.js";
import connectToMongoDB from "./mongoDB/connectToMongodb.js";
import User from "./models/user.js";

// Initialize dotenv
dotenv.config();

// Variables
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Route handlers
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/chat", messageRoutes);
app.use("/notification", notificationRoutes);
app.use("/generalroom", generalRoomRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 400;
  const errorMessage = err.message || "Something went wrong";
  res.status(statusCode).json({ error: errorMessage });
});

// Socket.IO connection

const getReceiverSocketid = (recieverId) => {
  return userSocketMap[recieverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Start server and connect to MongoDB
server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});

export { io, getReceiverSocketid, userSocketMap };
