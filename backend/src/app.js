import "dotenv/config";

import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);
// mongodb connection
const start = async () => {
    app.set("port", process.env.PORT || 8000);
    const uri = process.env.MONGO_URL;
    if (!uri) {
        throw new Error("MONGO_URL is missing");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected");

    server.listen(app.get("port"), () => {
        console.log(`Listening on port ${app.get("port")}`);
    });

}

start().catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
});