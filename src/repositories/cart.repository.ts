import { prisma } from "../libs/prisma";

export function findAllCart() {
    return prisma.cart.findMany({
        include: {
            user: {
                select: {
                    email: true
                }
            },
            cartItem: true,
            Product: true
        }
    });
}

export function findCartByUserId(userId: number) {
    return prisma.cart.findMany({
        where: { userId },
        select: {
            id: true,
            totalAmount: true,
            createdAt: true,
            status: true,
            user: true,
            cartItem: {
                select: {
                    id: true,
                    cartId: true,
                    quantity: true,
                    productId: true,
                    product: {
                        select: {
                            productName: true,
                            price: true,
                            image: true
                        }
                    }
                },
                orderBy: {
                    productId: 'asc'
                }
            }
        }
    });
}

export function findCartItemByUserId(userId: number) {
    return prisma.cart.findFirst({
        where: { userId, status: "ACTIVE" },
        include: { cartItem: true },
    });
}

export function createCart(userId: number, amount: number) {
    return prisma.cart.create({
        data: {
            userId
        }
    })
}

export async function updateCartTotalAmount(cartId: number, amount: number) {
    const cartExists = await prisma.cart.findUnique({
        where: { id: cartId },
    });

    if (!cartExists) {
        throw new Error(`Cart with ID ${cartId} not found.`);
    }

    return prisma.cart.update({
        where: { id: cartId },
        data: { totalAmount: amount },
    });
}

export function findCartItemByCartId(cartId: number) {
    return prisma.cart.findUnique({
        where: {
            id: cartId
        },
        select: {
            totalAmount: true,
            productId: true,
            cartItem: {
                select: {
                    quantity: true,
                }
            }
        }
    })
}
