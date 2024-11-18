import { Router } from "express";
import * as productController from "../../../contollers/product.controller";
import { authentication } from "../../../middlewares/authentication";
import upload from "../../../middlewares/upload";

const productRouter = Router();

productRouter.get('/get-all', productController.getAllProducts);
productRouter.get('/get-product/:productName', productController.getProductByParams);
productRouter.get('/get', authentication, productController.getProductByUserId);
productRouter.post('/create/:id', authentication, upload.single('image'), productController.createProduct);
productRouter.put('/edit/:id', authentication, upload.single('image'), productController.editProduct);
productRouter.delete('/delete/:id', authentication, productController.deleteProduct);

export default productRouter;