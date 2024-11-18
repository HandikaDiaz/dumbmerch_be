import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as messageService from "../services/message.service";

export async function getConversationAllUser(req: CustomRequest, res: Response) {
    try {
        const conversation = await messageService.findConversationAllUser();
        res.json(conversation);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving conversation", error });
    }
}

export async function getConversationByUserId(req: CustomRequest, res: Response) {
    try {
        const userId = req.params.userId
        const conversation = await messageService.findConversationByUserId(+userId);
        res.json(conversation);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving conversation", error });
    }
}

export async function getConversationHistory(req: CustomRequest, res: Response) {
    const userId = req.user.id
    try {
        const conversation = await messageService.getConversation(parseInt(userId));
        res.json(conversation);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving conversation", error });
    }
};