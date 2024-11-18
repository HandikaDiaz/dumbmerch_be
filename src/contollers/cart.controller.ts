import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as cartService from "../services/cart.service";

export async function getAllCart(req: CustomRequest, res: Response) {
    try {
        const cart = await cartService.findAllCart();
        res.json(cart);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function getCartByCartId(req: CustomRequest, res: Response) {
    try {
        const id = parseInt(req.params.cartId);
        const cart = await cartService.findCartByCartId(id);
        res.json(cart);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function getCart(req: CustomRequest, res: Response) {
    try {
        const user = req.user.id;
        const cart = await cartService.findCartByUserId(user);
        res.json(cart);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function createCart(req: CustomRequest, res: Response) {
    try {
        const user = req.user.id;
        const productId = parseInt(req.params.productId);
        await cartService.addProductToCart(user, productId);
        res.json({ message: "Product added to cart" });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function addQuantity(req: CustomRequest, res: Response) {
    try {
        const cartId = parseInt(req.params.cartId);
        const productId = parseInt(req.params.productId);
        await cartService.addQuantityProduct(cartId, productId);
        res.json({ message: "Product quantity updated" });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function removeQuantity(req: CustomRequest, res: Response) {
    try {
        const cartId = parseInt(req.params.cartId);
        const productId = parseInt(req.params.productId);
        await cartService.removeQuantityProduct(cartId, productId);
        res.json({ message: "Product quantity updated" });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function deleteCart(req: CustomRequest, res: Response) {
    try {
        const id = parseInt(req.params.cartId);
        await cartService.deleteProductFromCart(id);
        res.json({ message: "Product deleted from cart" });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}