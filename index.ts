import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import routerV1 from "./src/router/v1/router.v1";
import { Server } from "socket.io";
import { createServer } from "http";
import { socketHandler } from "./src/socket";

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routerV1);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    socketHandler(socket, io);
});

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello world!!!",
    });
});

server.listen(port, () => console.log("Server is running on port 3000"));