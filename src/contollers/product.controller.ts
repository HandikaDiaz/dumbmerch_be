import { Response } from "express";
import { CustomRequest } from "../libs/request";
import { findAllProduct } from "../repositories/product.repository";
import * as productService from "../services/product.service";
import uploader from "../libs/cloudinary";

export async function getAllProducts(req: CustomRequest, res: Response) {
    try {
        const categories = await findAllProduct();
        res.json(categories);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function getProductByParams(req: CustomRequest, res: Response) {
    try {
        const productName = req.params.productName;
        const product = await productService.findProductByParams(productName);
        res.json(product);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function getProductByUserId(req: CustomRequest, res: Response) {
    try {
        const id = req.params.id;
        const product = await productService.findProductByUserId(Number(id));
        res.json(product);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
        
    })}
}

export async function createProduct(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        const user = req.user.id;
        const categoryId = parseInt(req.params.id);
        if(req.file) {
            body.image = await uploader(req.file as Express.Multer.File);
        }
        await productService.createProduct(body, user, categoryId);
        res.json({ message: "Product created" });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function editProduct(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        const user = req.user.id;
        const id = parseInt(req.params.id);
        if(req.file) {
            body.image = await uploader(req.file as Express.Multer.File);
        }
        await productService.editProduct({ ...body, id }, user);
        res.json({ message: "Product updated" });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

export async function deleteProduct(req: CustomRequest, res: Response) {
    try {
        const id = req.params.id;
        await productService.deleteProduct(Number(id));
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}