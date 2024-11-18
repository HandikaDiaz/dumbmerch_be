import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as categoryService from "../services/category.service";
import { findAllCategory } from "../repositories/category.repository";

export async function getAllCategories(req: CustomRequest, res: Response) {
    try {
        const categories = await findAllCategory();
        res.json(categories);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function getCategories(req: CustomRequest, res: Response) {
    try {
        const categoryId = parseInt(req.params.categoryId);
        const categories = await categoryService.findCategoryById(categoryId);
        res.json(categories);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function createCategory(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        const user = req.user.id;
        await categoryService.createCategory(body, user);
        res.json({message: "Category created"});
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function editCategory(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        const user = req.user.id;
        const id = parseInt(req.params.id);
        await categoryService.editCategory({ ...body, id }, user);
        res.json({message: "Category updated"});
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function deleteCategory(req: CustomRequest, res: Response) {
    try {
        const id = req.params.id;
        await categoryService.deleteCategory(Number(id));
        res.json({message: "Category deleted"});
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}