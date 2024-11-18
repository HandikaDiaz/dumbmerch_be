import midtrans from "../libs/midtrans";
import { prisma } from "../libs/prisma";

export async function createTransaction(params: any) {
    try {
        const result = await midtrans.createTransaction(params);
        return result;
    } catch (error) {
        throw new Error(`Failed to create transaction: ${(error as Error).message}`);
    }
}

export function reduceQuantity(productId: number, quantity: number) {
    return prisma.product.updateMany({
        where: { id: productId },
        data: { Qty: { decrement: quantity } },
    });
}