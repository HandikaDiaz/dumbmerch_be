import { Server, Socket } from "socket.io";
import * as messageService from "../services/message.service";

export const socketHandler = (socket: Socket, io: Server) => {
    console.log(`${socket.id} connected`);

    socket.on("sendMessage", async (data: { fromUserId: number; content: string }) => {
        const adminId = 1;
        console.log("sendMessage", data);

        try {
            const message = await messageService.sendMessage(data.fromUserId, data.content, adminId);
            const room = `${data.fromUserId}_${adminId}`;

            socket.join(room);
            io.to(room).emit("receiveMessage", message);
        } catch (error) {
            console.error("Error in sendMessage:", error);
        }
    });

    socket.on("replyMessage", async (data: { toUserId: number; content: string; conversationId: number }) => {
        const adminId = 1;
        const room = `${data.toUserId}_${adminId}`;

        try {
            const message = await messageService.sendAdminReply(data.conversationId, adminId, data.content);
            io.to(room).emit("receiveMessage", message);
        } catch (error) {
            console.error("Error in replyMessage:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
};
