import { Request, Response } from "express";
import * as cartRepository from "../repositories/cart.repository";
import * as cartItemRepository from "../repositories/cart.item.repository";
import * as paymentService from "../services/payment.service";
import * as paymentRepository from "../repositories/payment.repository";

export async function createPayment(req: Request, res: Response) {
    try {
        const cartId = req.params.cartId;
        const cart = await cartRepository.findCartItemByCartId(+cartId);
        const cartItem = await cartItemRepository.findFisrtItemByCartId(+cartId);

        if (!cart || cart.totalAmount === undefined) {
            res.status(400).json({ message: "Total amount not found." });
            return
        }
        const result = await paymentService.initiatePayment(cart.totalAmount);
        for(let i = 0; i < cartItem.length; i++) {
            if (cartItem[i].productId) {                
                await paymentRepository.reduceQuantity(cartItem[i].productId, cartItem[i].quantity);
            }
        }
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}