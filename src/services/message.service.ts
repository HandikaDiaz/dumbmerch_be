import * as messageRepo from "../repositories/message.repository";

export async function findConversationAllUser() {
    return messageRepo.findConversationAllUser();
}

export async function findConversationByUserId(userId: number) {
    return messageRepo.findMessageByUserId(userId);
}

export async function getConversation(userId: number) {
    return messageRepo.getConversationHistory(userId);
}

export const sendMessage = async (fromUserId: number, content: string, adminId: number) => {
    let conversation = await messageRepo.findConversationByUserId(fromUserId, adminId);

    if (!conversation) {
        conversation = await messageRepo.createConversation(fromUserId, adminId);
    }

    return messageRepo.createMessage(conversation.id, fromUserId, content);
};

export const sendAdminReply = async (conversationId: number, adminId: number, content: string) => {
    return messageRepo.replyMessage(conversationId, adminId, content);
};