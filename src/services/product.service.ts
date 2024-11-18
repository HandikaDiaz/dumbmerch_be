import { createProductDto, editProductDto } from "../dto/product.dto";
import { prisma } from "../libs/prisma";
import * as productRepo from "../repositories/product.repository";

export async function findProductByUserId(userId: number) {
    const product = await productRepo.findProductByUserId(userId);
    if (!product) {
        throw new Error("Product not found");
    }
    return product
}

export async function findProductByParams(productName: string) {
    const product = await productRepo.findProductByProductName(productName);
    if (!product) {
        throw new Error("Product not found");
    }
    return product
}

export async function createProduct(data: createProductDto, userId: number, categoryId: number) {
    const product = await productRepo.createProduct({...data, price: Number(data.price), qty: Number(data.qty)}, userId, categoryId);
    if (!product) {
        throw new Error("Product not created");
    }
    return product
}

export async function editProduct(data: editProductDto, userId: number) {
    const product = await productRepo.findProductById(data.id);
    if (!product) {
        throw new Error("Product not found");
    }
    const updatedData = {
        id: data.id,
        productName: data.productName == "" ? product.productName : data.productName,
        productDesc: data.productDesc == "" ? product.productDesc : data.productDesc,
        price: data.price == undefined ? Number(product.price) : Number(data.price),
        qty: data.qty == undefined ? Number(product.Qty) : Number(data.qty)
    };
    if (data.image) {
        await productRepo.editProductImage(product.image[0].id, data.image.url);
    }
    const updateProduct = await productRepo.editProduct(updatedData, userId);
    
    if (!updateProduct) {
        throw new Error("Product not updated");
    }
    return updateProduct
}

export async function deleteProduct(id: number) {
    const product = await productRepo.deleteProduct(id);
    if (!product) {
        throw new Error("Product not deleted");
    }
    return product
}