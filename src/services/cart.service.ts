import * as cartRepo from "../repositories/cart.repository";
import * as cartItemRepo from "../repositories/cart.item.repository";
import { getProductPrice } from "../repositories/product.repository";

export async function findAllCart() {
    return await cartRepo.findAllCart();
}

export async function findCartByCartId(cartId: number) {
    return await cartItemRepo.findCartItemsByCartId(cartId);
}

export async function findCartByUserId(userId: number) {
    return await cartRepo.findCartByUserId(userId);
}

export async function addProductToCart(userId: number, productId: number) {
    let checkCart = await cartRepo.findCartItemByUserId(userId);
    let cartId;

    if (!checkCart) {
        const createCart = await cartRepo.createCart(userId, 0);
        cartId = createCart.id;
    } else {
        cartId = checkCart.id;
    }

    const product = await getProductPrice(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    const cartItem = await cartItemRepo.addItemToCart(cartId, productId);
    const totalAmount = await calculateCartTotal(cartId);
    await cartRepo.updateCartTotalAmount(cartId, totalAmount);

    return cartItem;
}

export async function addQuantityProduct(cartId: number, productId: number) {
    const addQty = await cartItemRepo.addQuantity(productId);
    const cartItem = await cartItemRepo.findFisrtItemByCartId(cartId);
    if (!cartItem) {
        throw new Error("Cart item not found");
    }
    const totalAmount = await calculateCartTotal(cartId);
    await cartRepo.updateCartTotalAmount(cartId, totalAmount);
    return addQty;
}

export async function removeQuantityProduct(cartId: number, productId: number) {
    const removeQty = await cartItemRepo.removeQuantity(productId);
    const cartItem = await cartItemRepo.findFisrtItemByCartId(cartId);
    if (!cartItem) {
        throw new Error("Cart item not found");
    }
    const totalAmount = await calculateCartTotal(cartId);
    await cartRepo.updateCartTotalAmount(cartId, totalAmount);
    return removeQty;
}

export async function deleteProductFromCart(id: number) {
    const cartItem = await cartItemRepo.findCartItemById(id);
    if (!cartItem) {
        throw new Error("Cart item not found");
    }
    return await cartItemRepo.deleteCartItem(id);
}

async function calculateCartTotal(cartId: number): Promise<number> {
    const cartItems = await cartItemRepo.findCartItemsByCartId(cartId); 
    let totalAmount = 0;

    if (!cartItems) {
        return totalAmount;
    }

    for (const item of cartItems) {
        const productPrice = await getProductPrice(item.productId);
        totalAmount += (productPrice?.price ?? 0) * (item.quantity ?? 0);
    }

    return totalAmount;
}
