import { Router } from "express";
import * as messageController from "../../../contollers/message.controller";
import { authentication } from "../../../middlewares/authentication";

const messageRouter = Router();

messageRouter.get("/all-user", messageController.getConversationAllUser);
messageRouter.get("/by-user/:userId", messageController.getConversationByUserId);
messageRouter.get("/history", authentication, messageController.getConversationHistory);

export default messageRouter;