import { Router } from "express";
import * as cartController from "../../../contollers/cart.controller";
import { authentication } from "../../../middlewares/authentication";

const cartRouter = Router();

cartRouter.get('/get-all', cartController.getAllCart);
cartRouter.get('/get', authentication, cartController.getCart);
cartRouter.get('/get-info/:cartId', cartController.getCartByCartId);
cartRouter.post('/create/:productId', authentication, cartController.createCart);
cartRouter.post('/add/:cartId/:productId', authentication, cartController.addQuantity);
cartRouter.post('/remove/:cartId/:productId', authentication, cartController.removeQuantity);
cartRouter.delete('/delete/:cartId', authentication, cartController.deleteCart);


export default cartRouter;