import { prisma } from "../libs/prisma";

export async function findConversationAllUser() {
    return prisma.conversation.findMany({
        select: {
            messages: true,
            userId: true,
            user: {
                select: {
                    profile: {
                        select: {
                            username: true,
                            image: true
                        }
                    }
                }
            }
        }
    })
}

export async function findMessageByUserId(userId: number) {
    return prisma.conversation.findMany({
        where: { userId },
        include: {
            messages: true
        }
    })
}

export async function getConversationHistory(userId: number) {
    return prisma.message.findMany({
        where: {
            conversation: {
                user: {
                    id: userId
                }
            }
        },
        select:{
            id: true,
            content: true,
            createdAt: true,
            senderId: true,
            conversation: {
                select: {
                    id: true,
                    userId: true
                }
            },
            sender: {
                select: {
                    profile: {
                        select: {
                            username: true,
                            image: true
                        }
                    }
                }
            }
        }
    });
}

export const createMessage = async (conversationId: number, senderId: number, content: string) => {
    return prisma.message.create({
        data: {
            conversationId,
            senderId,
            content,
        },
    });
};

export const findConversationByUserId = async (userId: number, adminId: number) => {
    return prisma.conversation.findFirst({
        where: {
            userId,
            adminId,
        },
    });
};

export const createConversation = async (userId: number, adminId: number) => {
    return prisma.conversation.create({
        data: {
            userId,
            adminId,
        },
    });
};

export const replyMessage = async (conversationId: number, adminId: number, content: string) => {
    return prisma.message.create({
        data: {
            conversationId,
            senderId: adminId,
            content,
        },
    });
};