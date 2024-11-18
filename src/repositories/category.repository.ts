import { createCategoryDto, editCategoryDto } from "../dto/category.dto";
import { prisma } from "../libs/prisma";

export function findAllCategory() {
    return prisma.category.findMany({
        select: {
            id: true,
            categoryName: true,
            _count: true,
            product: {
                select: {
                    id: true,
                    productName: true,
                    productDesc: true,
                    price: true,
                    Qty: true,
                    image: true,
                    _count: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export function findCategoryById(id: number) {
    return prisma.category.findUnique({
        where: {
            id
        }
    })
}
export function createCategory(data: createCategoryDto, userId: number) {
    return prisma.category.create({
        data: {
            categoryName: data.categoryName,
            userId
        }
    })
}
export function editCategory(data: editCategoryDto, userId: number) {
    return prisma.category.update({
        where: {
            id: data.id,
            userId
        },
        data: {
            categoryName: data.categoryName
        }
    })
}

export function deleteCategory(id: number) {
    return prisma.category.delete({
        where: {
            id
        }
    })
}