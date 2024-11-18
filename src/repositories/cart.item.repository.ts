import { prisma } from "../libs/prisma";

export function findCartItemById(id: number) {
    return prisma.cartItem.findUnique({
        where: { id },
    });
}

export function findCartItemsByCartId(cartId: number) {
    return prisma.cartItem.findMany({
        where: {
            cartId
        },
        select: {
            id: true,
            productId: true,
            quantity: true,
            product: true
        }
    });
}

export function findFisrtItemByCartId(cartId: number) {
    return prisma.cartItem.findMany({
        where: {
            cartId
        },
    });
}

export function getProductQty(productId: number) {
    return prisma.cartItem.findUnique({
        where: { id: productId },
        select: { quantity: true },
    })
}

export function addItemToCart(cartId: number, productId: number) {
    return prisma.cartItem.create({
        data: {
            cartId,
            productId,
            quantity: 1
        },
    })
}

export function addQuantity(productId: number) {
    return prisma.cartItem.updateMany({
        where: { productId },
        data: { quantity: { increment: 1 } },
    })
}

export function removeQuantity(productId: number) {
    return prisma.cartItem.updateMany({
        where: { productId },
        data: { quantity: { decrement: 1 } },
    })
}

export function deleteCartItem(id: number) {
    return prisma.cartItem.delete({
        where: { id },
    })
}
