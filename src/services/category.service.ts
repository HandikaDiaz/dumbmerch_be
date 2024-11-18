import { createCategoryDto, editCategoryDto } from "../dto/category.dto";
import * as categoryRepo from "../repositories/category.repository";

export async function findCategoryById(id: number) {
    const category = await categoryRepo.findCategoryById(id);
    if (!category) {
        throw new Error("Category not found");
    }
    return category
}

export async function createCategory(data: createCategoryDto, userId: number) {
    const category = await categoryRepo.createCategory(data, userId);
    if (!category) {
        throw new Error("Category not created");
    }
    return category
}

export async function editCategory(data: editCategoryDto, userId: number) {
    const category = await categoryRepo.editCategory(data, userId);
    if (!category) {
        throw new Error("Category not updated");
    }
    return category
}

export async function deleteCategory(id: number) {
    const category = await categoryRepo.deleteCategory(id);
    if (!category) {
        throw new Error("Category not deleted");
    }
    return category
}