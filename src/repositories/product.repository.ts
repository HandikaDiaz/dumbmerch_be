import { createProductDto, editProductDto } from "../dto/product.dto";
import { prisma } from "../libs/prisma";

export function findAllProduct() {
    return prisma.product.findMany({
        select: {
            id: true,
            productName: true,
            productDesc: true,
            price: true,
            Qty: true,
            image: true,
            _count: true
        }
    })
}

export function findProductByProductName(productName: string){
    return prisma.product.findFirst({
        where: {
            productName
        },
        include: {
            image: true
        }
    })
}

export function findProductByUserId(userId: number) {
    return prisma.product.findMany({
        where: {
            userId
        }
    })
}

export function getProductPrice(productId: number) {
    return prisma.product.findUnique({
        where: { id: productId },
        select: { price: true },
    })
}

export function findProductById(id: number) {
    return prisma.product.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            productName: true,
            productDesc: true,
            price: true,
            Qty: true,
            image: {
                select: {
                    id: true,
                    url: true
                }
            }
        }
    })
}

export function createProduct(data: createProductDto, userId: number, categoryId: number) {
    return prisma.product.create({
        data: {
            productName: data.productName,
            productDesc: data.productDesc,
            price: data.price,
            Qty: data.qty,
            categoryId,
            userId,
            image: {
                create: {
                    url: data.image.url
                }
            }
        }
    })
}

export function editProduct(data: editProductDto, userId: number) {
    return prisma.product.update({
        where: {
            id: data.id
        },
        data: {
            productName: data.productName,
            productDesc: data.productDesc,
            price: data.price,
            Qty: data.qty
        }
    })
}

export function editProductImage(id: number, url: string) {
    return prisma.imageProduct.update({
        where: { id },
        data: { url }
    });
}

export async function deleteProduct(id: number) {
    await prisma.imageProduct.deleteMany({
        where: {
            productId: id,
        },
    });

    return prisma.product.delete({
        where: {
            id
        }
    })
}